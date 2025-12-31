import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import Workspace from '@/models/Workspace';
import Activity from '@/models/Activity';
import { canEditProject } from '@/lib/permissions';

// GET project details
export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();

    const project = await Project.findById(id).populate('workspaceId', 'name ownerId members');
    
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const workspace = project.workspaceId;

    // Verify user has access to this workspace
    const isMember = workspace.ownerId.toString() === session.user.id || 
                    workspace.members.some(m => m.userId.toString() === session.user.id);

    if (!isMember) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH update project
export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, description, status, techStack } = body;

    await dbConnect();
    const project = await Project.findById(id).populate('workspaceId');

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    if (!canEditProject(project.workspaceId, session.user.id)) {
      return NextResponse.json({ error: 'Permission denied' }, { status: 403 });
    }

    if (title) project.title = title.trim();
    if (description !== undefined) project.description = description.trim();
    if (status) project.status = status;
    if (techStack) project.techStack = techStack;

    await project.save();

    // Log activity
    await Activity.create({
      action: `updated project "${project.title}"`,
      userId: session.user.id,
      projectId: project._id,
      workspaceId: project.workspaceId._id
    });

    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE project
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();
    const project = await Project.findById(id).populate('workspaceId');

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    if (!canEditProject(project.workspaceId, session.user.id)) {
      return NextResponse.json({ error: 'Permission denied to delete project' }, { status: 403 });
    }

    const projectTitle = project.title;
    const workspaceId = project.workspaceId._id;

    // Delete associated activities
    await Activity.deleteMany({ projectId: id });

    // Delete project
    await Project.findByIdAndDelete(id);

    // Log activity
    await Activity.create({
      action: `deleted project "${projectTitle}"`,
      userId: session.user.id,
      workspaceId: workspaceId
    });

    return NextResponse.json({ message: `Project "${projectTitle}" deleted successfully` });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
