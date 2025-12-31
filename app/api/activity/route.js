import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Activity from '@/models/Activity';
import Workspace from '@/models/Workspace';
import Project from '@/models/Project';

// GET activity logs
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const workspaceId = searchParams.get('workspaceId');
    const projectId = searchParams.get('projectId');
    const limit = parseInt(searchParams.get('limit')) || 20;
    const page = parseInt(searchParams.get('page')) || 1;
    const skip = (page - 1) * limit;

    let query = {};

    if (workspaceId) {
      // Verify access to specific workspace
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
    } else if (projectId) {
      // Verify access via project's workspace
      const project = await Project.findById(projectId).populate('workspaceId');
      
      if (!project) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
      }

      const workspace = project.workspaceId;
      const isMember = workspace.ownerId.toString() === session.user.id || 
                      workspace.members.some(m => m.userId.toString() === session.user.id);

      if (!isMember) {
        return NextResponse.json({ error: 'Access denied' }, { status: 403 });
      }

      query.projectId = projectId;
    } else {
      // Security: If no ID provided, only show activities from user's workspaces
      const userWorkspaces = await Workspace.find({
        $or: [
          { ownerId: session.user.id },
          { 'members.userId': session.user.id }
        ]
      }).select('_id');

      const workspaceIds = userWorkspaces.map(w => w._id);
      query.workspaceId = { $in: workspaceIds };
    }

    // Get total count for pagination
    const total = await Activity.countDocuments(query);

    // Get activities
    const activities = await Activity.find(query)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name email image')
      .populate('projectId', 'title')
      .populate('workspaceId', 'name');

    return NextResponse.json({ 
      activities,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 });
  }
}
