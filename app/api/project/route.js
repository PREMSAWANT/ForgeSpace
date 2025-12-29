import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import Workspace from '@/models/Workspace';
import Activity from '@/models/Activity';
import { canEditProject } from '@/lib/permissions';

// GET all projects (optionally filtered by workspace)
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const workspaceId = searchParams.get('workspaceId');

    let query = {};
    
    if (workspaceId) {
      // Verify user has access to this workspace
      const workspace = await Workspace.findById(workspaceId);
      
      if (!workspace) {
        return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
      }

      const isMember = workspace.ownerId.toString() === session.user.id || 
                      workspace.members.some(m => m.userId.toString() === session.user.id);

      if (!isMember) {
        return NextResponse.json({ error: 'Access denied' }, { status: 403 });
      }

      query.workspaceId = workspaceId;
    }

    const projects = await Project.find(query).populate('workspaceId', 'name');

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

// POST create new project
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, workspaceId, status, techStack } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ error: 'Project title is required' }, { status: 400 });
    }

    if (!workspaceId) {
      return NextResponse.json({ error: 'Workspace ID is required' }, { status: 400 });
    }

    await dbConnect();

    // Verify workspace exists and user has permission
    const workspace = await Workspace.findById(workspaceId);
    
    if (!workspace) {
      return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
    }

    if (!canEditProject(workspace, session.user.id)) {
      return NextResponse.json({ error: 'Permission denied' }, { status: 403 });
    }

    // Create project
    const project = await Project.create({
      title: title.trim(),
      description: description?.trim() || '',
      workspaceId,
      status: status || 'active',
      techStack: techStack || []
    });

    // Log activity
    await Activity.create({
      action: `created project "${title}"`,
      userId: session.user.id,
      projectId: project._id,
      workspaceId
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
