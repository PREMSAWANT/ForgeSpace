'use client';

import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import ProjectCard from '@/components/ProjectCard';
import ActivityLog from '@/components/ActivityLog';
import { getInitials } from '@/utils/helpers';
import { Button, Avatar, Badge, Card } from '@/components/ui';

export default function WorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [workspace, setWorkspace] = useState(null);
  const [projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInviting, setIsInviting] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');
  const [invitingStatus, setInvitingStatus] = useState('idle'); // idle, loading, success, error
  const [inviteError, setInviteError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchWorkspaceData = async () => {
      if (!session || !params.id) return;
      
      try {
        setLoading(true);
        
        // Fetch workspace metadata, projects, and activities in parallel
        const [workspaceRes, projectsRes, activitiesRes] = await Promise.all([
          fetch(`/api/workspace/${params.id}`),
          fetch(`/api/project?workspaceId=${params.id}`),
          fetch(`/api/activity?workspaceId=${params.id}&limit=10`)
        ]);

        if (workspaceRes.status === 404) {
          setWorkspace(null);
          return;
        }

        if (!workspaceRes.ok || !projectsRes.ok || !activitiesRes.ok) {
          throw new Error('Failed to fetch workspace information');
        }

        const workspaceData = await workspaceRes.json();
        const projectsData = await projectsRes.json();
        const activitiesData = await activitiesRes.json();

        setWorkspace(workspaceData.workspace);
        setProjects(projectsData.projects || []);
        setActivities(activitiesData.activities || []);
      } catch (error) {
        console.error('Error fetching workspace data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session && params.id) {
      fetchWorkspaceData();
    }
  }, [session, params.id]);

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!inviteEmail) return;

    try {
      setInvitingStatus('loading');
      setInviteError('');

      const res = await fetch(`/api/workspace/${params.id}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inviteEmail, role: inviteRole })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to invite member');
      }

      // Update local workspace state with new members
      setWorkspace(data.workspace);
      setInvitingStatus('success');
      setInviteEmail('');
      setTimeout(() => {
        setIsInviting(false);
        setInvitingStatus('idle');
      }, 2000);
    } catch (err) {
      setInviteError(err.message);
      setInvitingStatus('error');
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-grey-muted mono">Loading workspace...</div>
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-grey-muted">Workspace not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      {/* Visual Alignment for Sidebar */}
      <div className="fixed inset-y-0 left-0 w-80 pointer-events-none hidden md:block" />
      <Sidebar />

      {/* Main Content Area */}
      <main className="md:pl-80 max-w-7xl mx-auto space-y-10">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Breadcrumb / Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Link href="/dashboard" className="text-grey-soft hover:text-white transition-colors">
                  ← Back to Dashboard
                </Link>
              </div>
              <div className="flex items-baseline gap-4 mb-2">
                <h1 className="text-5xl font-bold tracking-tight">{workspace.name}</h1>
                <span className="code text-sm opacity-50">/{params.id.slice(0, 8)}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-grey-soft">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-grey-dark border border-grey-border">
                   <div className="w-2 h-2 rounded-full bg-white"></div>
                   <span>Owner: <span className="text-white ml-1">{workspace.ownerId.name}</span></span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setIsInviting(true)}>
                Invite Team
              </Button>
              <Link href={`/project/new?workspace=${workspace._id}`}>
                <Button variant="primary">
                  + New Project
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-4xl">⚡</div>
              <div className="text-4xl font-bold mb-1">{projects.length}</div>
              <div className="text-sm text-grey-soft font-medium tracking-wide">Active Projects</div>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-grey-border bg-grey-dark/40 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-4xl">👥</div>
              <div className="text-4xl font-bold mb-1">{workspace.members.length}</div>
              <div className="text-sm text-grey-soft font-medium tracking-wide">Team Members</div>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-grey-border bg-grey-dark/40 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-4xl">📈</div>
              <div className="text-4xl font-bold mb-1">{activities.length}</div>
              <div className="text-sm text-grey-soft font-medium tracking-wide">Activities</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Projects Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
                <div className="text-sm text-secondary hover:text-white cursor-pointer">View All →</div>
              </div>
              
              {projects.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {projects.map((project) => (
                    <ProjectCard key={project._id} project={project} />
                  ))}
                </div>
              ) : (
                <div className="border border-dashed border-grey-border rounded-xl p-12 text-center hover:bg-grey-dark/30 transition-colors">
                  <div className="text-4xl opacity-30 mb-4">📂</div>
                  <h3 className="text-lg font-medium mb-2">No projects yet</h3>
                  <p className="text-grey-muted text-sm mb-6">Launch your first project to get started.</p>
                  <Button variant="secondary" size="sm">Create Project</Button>
                </div>
              )}
            </div>

            {/* Sidebar Column (Members) */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold tracking-tight">Team</h2>
              <div className="card rounded-2xl p-0 overflow-hidden border-white/5 bg-black/40">
                <div className="divide-y divide-white/5">
                  {workspace.members.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <Avatar user={member.userId} size="sm" />
                        <div>
                          <div className="text-sm font-medium">{member.userId.name}</div>
                          <div className="text-xs text-grey-muted mono">{member.role}</div>
                        </div>
                      </div>
                      {member.role === 'owner' && (
                        <span className="text-[10px] uppercase tracking-wider font-bold bg-white/10 px-2 py-0.5 rounded text-white/70">Owner</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-grey-dark/20 text-center">
                  <Button variant="ghost" size="sm" className="w-full">
                    Manage Team Settings
                  </Button>
                </div>
              </div>

               {/* Activity Log Mini */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold tracking-tight mb-4">Latest Activity</h2>
                <ActivityLog activities={activities.slice(0, 5)} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Invite Member Modal */}
      {isInviting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <Card className="max-w-md w-full p-8 relative animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsInviting(false)}
              className="absolute top-4 right-4 text-grey-muted hover:text-white transition-colors"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-2">Invite Collaborator</h2>
            <p className="text-grey-muted text-sm mb-6">
              Add a developer to your workspace by their email address.
            </p>

            <form onSubmit={handleInvite} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-grey-soft font-bold">Developer Email</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="w-full bg-grey-dark border border-grey-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/20 transition-all font-mono text-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-grey-soft font-bold">Workspace Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full bg-grey-dark border border-grey-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/20 transition-all"
                >
                  <option value="member">Member (Read/Write)</option>
                  <option value="admin">Admin (Full Control)</option>
                  <option value="viewer">Viewer (Read Only)</option>
                </select>
              </div>

              {inviteError && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs">
                  {inviteError}
                </div>
              )}

              {invitingStatus === 'success' && (
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-xs">
                  Success! Collaborator added to your team.
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="secondary" 
                  className="flex-1"
                  onClick={() => setIsInviting(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="flex-1"
                  disabled={invitingStatus === 'loading' || invitingStatus === 'success'}
                >
                  {invitingStatus === 'loading' ? 'Inviting...' : 'Send Invite'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
