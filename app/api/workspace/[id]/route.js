import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Workspace from '@/models/Workspace';
import Project from '@/models/Project';
import Activity from '@/models/Activity';
import { canEditWorkspace, canDeleteWorkspace } from '@/lib/permissions';

// GET workspace details
export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();

    const workspace = await Workspace.findById(id).populate('ownerId', 'name email image');
    
    if (!workspace) {
      return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
    }

    // Verify user is a member
    const isMember = workspace.ownerId._id.toString() === session.user.id || 
                    workspace.members.some(m => m.userId.toString() === session.user.id);

    if (!isMember) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    return NextResponse.json({ workspace }, { status: 200 });
  } catch (error) {
    console.error('Error fetching workspace:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH update workspace
export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { name } = body;

    await dbConnect();
    const workspace = await Workspace.findById(id);

    if (!workspace) {
      return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
    }

    if (!canEditWorkspace(workspace, session.user.id)) {
      return NextResponse.json({ error: 'Permission denied' }, { status: 403 });
    }

    if (name) {
      workspace.name = name.trim();
      await workspace.save();

      // Log activity
      await Activity.create({
        action: `updated workspace name to "${name}"`,
        userId: session.user.id,
        workspaceId: workspace._id
      });
    }

    return NextResponse.json({ workspace }, { status: 200 });
  } catch (error) {
    console.error('Error updating workspace:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE workspace
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();
    const workspace = await Workspace.findById(id);

    if (!workspace) {
      return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
    }

    if (!canDeleteWorkspace(workspace, session.user.id)) {
      return NextResponse.json({ error: 'Only the owner can delete a workspace' }, { status: 403 });
    }

    const workspaceName = workspace.name;

    // Delete associated projects
    await Project.deleteMany({ workspaceId: id });
    
    // Delete associated activities
    await Activity.deleteMany({ workspaceId: id });

    // Delete workspace
    await Workspace.findByIdAndDelete(id);

    return NextResponse.json({ message: `Workspace "${workspaceName}" and all associated data deleted successfully` });
  } catch (error) {
    console.error('Error deleting workspace:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
