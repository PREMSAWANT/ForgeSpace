import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Workspace from '@/models/Workspace';
import User from '@/models/User';
import Activity from '@/models/Activity';
import { canInviteMembers } from '@/lib/permissions';

// POST add or update member in workspace
export async function POST(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { email, role } = body;

    if (!email) {
      return NextResponse.json({ error: 'User email is required' }, { status: 400 });
    }

    await dbConnect();
    const workspace = await Workspace.findById(id);

    if (!workspace) {
      return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
    }

    if (!canInviteMembers(workspace, session.user.id)) {
      return NextResponse.json({ error: 'Permission denied' }, { status: 403 });
    }

    // Find the user by email
    const userToAdd = await User.findOne({ email });
    if (!userToAdd) {
      return NextResponse.json({ error: 'User not found in ForgeSpace' }, { status: 404 });
    }

    // Check if already a member
    const existingMemberIndex = workspace.members.findIndex(
      m => m.userId.toString() === userToAdd._id.toString()
    );

    if (existingMemberIndex !== -1) {
      // Update role if already member
      workspace.members[existingMemberIndex].role = role || 'member';
    } else {
      // Add as new member
      workspace.members.push({
        userId: userToAdd._id,
        role: role || 'member'
      });
    }

    await workspace.save();

    // Log activity
    await Activity.create({
      action: `added user "${userToAdd.email}" as ${role || 'member'} to workspace`,
      userId: session.user.id,
      workspaceId: workspace._id
    });

    return NextResponse.json({ workspace }, { status: 200 });
  } catch (error) {
    console.error('Error adding member:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE remove member from workspace
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const userIdToRemove = searchParams.get('userId');

    if (!userIdToRemove) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    await dbConnect();
    const workspace = await Workspace.findById(id);

    if (!workspace) {
      return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
    }

    // Check if user is owner or admin (to remove others) or the user themselves (to leave)
    const isSelfRemovall = userIdToRemove === session.user.id;
    const hasPermission = canInviteMembers(workspace, session.user.id) || isSelfRemovall;

    if (!hasPermission) {
      return NextResponse.json({ error: 'Permission denied' }, { status: 403 });
    }

    // Prevent removing the owner
    if (workspace.ownerId.toString() === userIdToRemove) {
      return NextResponse.json({ error: 'Workspace owner cannot be removed' }, { status: 403 });
    }

    // Remove member
    workspace.members = workspace.members.filter(
      m => m.userId.toString() !== userIdToRemove
    );

    await workspace.save();

    // Log activity
    await Activity.create({
      action: isSelfRemovall ? 'left the workspace' : `removed a member from workspace`,
      userId: session.user.id,
      workspaceId: workspace._id
    });

    return NextResponse.json({ workspace }, { status: 200 });
  } catch (error) {
    console.error('Error removing member:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
