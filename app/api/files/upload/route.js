import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import Workspace from '@/models/Workspace';
import Activity from '@/models/Activity';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST upload file
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file');
    const projectId = formData.get('projectId');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    await dbConnect();

    // Verify project exists and user has permission
    const project = await Project.findById(projectId).populate('workspaceId');
    
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const workspace = project.workspaceId;
    const isMember = workspace.ownerId.toString() === session.user.id || 
                    workspace.members.some(m => m.userId.toString() === session.user.id);

    if (!isMember) {
      return NextResponse.json({ error: 'Permission denied' }, { status: 403 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `forgespace/${projectId}`,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    // Save file URL to project
    project.files.push({
      url: uploadResult.secure_url,
      name: file.name,
      uploadedBy: session.user.id,
      uploadedAt: new Date()
    });

    await project.save();

    // Log activity
    await Activity.create({
      action: `uploaded file "${file.name}"`,
      userId: session.user.id,
      projectId,
      workspaceId: workspace._id
    });

    return NextResponse.json({ 
      url: uploadResult.secure_url,
      message: 'File uploaded successfully'
    }, { status: 200 });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
