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

    const connection = await dbConnect();
    
    // Return empty array if no database connection (build time or missing env)
    if (!connection) {
      return NextResponse.json({ activities: [] }, { status: 200 });
    }

    const { searchParams } = new URL(request.url);
    const workspaceId = searchParams.get('workspaceId');
    const projectId = searchParams.get('projectId');
    const limit = parseInt(searchParams.get('limit')) || 20;

    let query = {};

    // Verify access if filtering by workspace or project
    if (workspaceId) {
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

    if (projectId) {
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
    }

    // Get activities
    const activities = await Activity.find(query)
      .sort({ timestamp: -1 })
      .limit(limit)
      .populate('userId', 'name email image');

    return NextResponse.json({ activities }, { status: 200 });
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 });
  }
}
