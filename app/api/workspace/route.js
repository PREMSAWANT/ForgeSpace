import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Workspace from '@/models/Workspace';
import Project from '@/models/Project';
import Activity from '@/models/Activity';

// GET all workspaces for logged-in user
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const connection = await dbConnect();
    if (!connection) {
      return NextResponse.json({ workspaces: [] }, { status: 200 });
    }

    // Find workspaces where user is owner or member
    const workspaces = await Workspace.find({
      $or: [
        { ownerId: session.user.id },
        { 'members.userId': session.user.id }
      ]
    }).populate('ownerId', 'name email image');

    return NextResponse.json({ workspaces }, { status: 200 });
  } catch (error) {
    console.error('Error fetching workspaces:', error);
    return NextResponse.json({ error: 'Failed to fetch workspaces' }, { status: 500 });
  }
}

// POST create new workspace
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Workspace name is required' }, { status: 400 });
    }

    await dbConnect();

    // Create workspace
    const workspace = await Workspace.create({
      name: name.trim(),
      ownerId: session.user.id,
      members: [
        {
          userId: session.user.id,
          role: 'owner'
        }
      ]
    });

    // Log activity
    await Activity.create({
      action: `created workspace "${name}"`,
      userId: session.user.id,
      workspaceId: workspace._id
    });

    return NextResponse.json({ workspace }, { status: 201 });
  } catch (error) {
    console.error('Error creating workspace:', error);
    return NextResponse.json({ error: 'Failed to create workspace' }, { status: 500 });
  }
}
