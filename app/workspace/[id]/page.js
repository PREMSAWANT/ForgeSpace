'use client';

import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import ProjectCard from '@/components/ProjectCard';
import ActivityLog from '@/components/ActivityLog';
import { getInitials } from '@/utils/helpers';

export default function WorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [workspace, setWorkspace] = useState(null);
  const [projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    if (session && params.id) {
      // Fetch workspace data
      // For now, placeholder data
      setWorkspace({
        _id: params.id,
        name: 'Engineering Workspace',
        ownerId: { name: session.user.name, email: session.user.email },
        members: [
          { userId: { name: session.user.name }, role: 'owner' }
        ]
      });
      setProjects([]);
      setActivities([]);
      setLoading(false);
    }
  }, [session, params.id]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-muted mono">Loading workspace...</div>
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-muted">Workspace not found</div>
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
                <Link href="/dashboard" className="text-secondary hover:text-white transition-colors">
                  ← Back to Dashboard
                </Link>
              </div>
              <div className="flex items-baseline gap-4 mb-2">
                <h1 className="text-5xl font-bold tracking-tight">{workspace.name}</h1>
                <span className="code text-sm opacity-50">/{params.id.slice(0, 8)}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-secondary">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                   <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                   <span>Owner: <span className="text-white ml-1">{workspace.ownerId.name}</span></span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="btn-secondary">
                Invite Team
              </button>
              <button className="btn-primary">
                + New Project
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-4xl">⚡</div>
              <div className="text-4xl font-bold mb-1">{projects.length}</div>
              <div className="text-sm text-secondary font-medium tracking-wide">Active Projects</div>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-4xl">👥</div>
              <div className="text-4xl font-bold mb-1">{workspace.members.length}</div>
              <div className="text-sm text-secondary font-medium tracking-wide">Team Members</div>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-4xl">📈</div>
              <div className="text-4xl font-bold mb-1">{activities.length}</div>
              <div className="text-sm text-secondary font-medium tracking-wide">Activities</div>
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
                <div className="border border-dashed border-white/10 rounded-xl p-12 text-center hover:bg-white/5 transition-colors">
                  <div className="text-4xl opacity-30 mb-4">📂</div>
                  <h3 className="text-lg font-medium mb-2">No projects yet</h3>
                  <p className="text-secondary text-sm mb-6">Launch your first project to get started.</p>
                  <button className="btn-secondary text-sm">Create Project</button>
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
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center text-xs font-bold border border-white/10">
                          {getInitials(member.userId.name)}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{member.userId.name}</div>
                          <div className="text-xs text-secondary mono">{member.role}</div>
                        </div>
                      </div>
                      {member.role === 'owner' && (
                        <span className="text-[10px] uppercase tracking-wider font-bold bg-white/10 px-2 py-0.5 rounded text-white/70">Owner</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-white/5 text-center">
                  <button className="text-xs text-secondary hover:text-white font-medium w-full py-1">
                    Manage Team Settings
                  </button>
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
    </div>
  );
}
