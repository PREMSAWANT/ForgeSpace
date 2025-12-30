'use client';

import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import FileUploader from '@/components/FileUploader';
import ActivityLog from '@/components/ActivityLog';
import { formatDate, getStatusColor } from '@/utils/helpers';

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [project, setProject] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    if (session && params.id) {
      // Fetch project data
      // Placeholder data
      setProject({
        _id: params.id,
        title: 'API Development Sprint',
        description: 'Building RESTful API endpoints with authentication and role-based access control',
        status: 'active',
        techStack: ['Next.js', 'MongoDB', 'NextAuth', 'Cloudinary'],
        files: [],
        workspaceId: { name: 'Engineering Workspace' },
        createdAt: new Date()
      });
      setActivities([]);
      setLoading(false);
    }
  }, [session, params.id]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-grey-muted mono">Loading project...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-grey-muted">Project not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="fixed inset-y-0 left-0 w-80 pointer-events-none hidden md:block" />
      <Sidebar />

      <main className="md:pl-80 max-w-7xl mx-auto space-y-10">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
           {/* Header */}
           <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                 <Link href={`/workspace/${project.workspaceId._id || '1'}`} className="text-grey-soft hover:text-white transition-colors text-sm">
                    {project.workspaceId.name} 
                 </Link>
                 <span className="text-secondary/30">/</span>
                 <span className="text-white text-sm">Project Details</span>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{project.title}</h1>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider border ${
                        project.status === 'active' ? 'bg-grey-dark border-grey-border text-white' : 'bg-grey-dark border-grey-border text-grey-soft'
                    }`}>
                      {project.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-grey-muted text-lg max-w-2xl leading-relaxed">{project.description}</p>
                </div>

                <div className="flex gap-3">
                   <button className="btn-secondary">Settings</button>
                   <button className="btn-primary">Deploy</button>
                </div>
              </div>
           </div>

           <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column: Tech & Files */}
              <div className="lg:col-span-2 space-y-8">
                 {/* Tech Stack */}
                 <section>
                    <h3 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">Technology Stack</h3>
                    <div className="flex flex-wrap gap-2">
                       {project.techStack.map((tech, index) => (
                          <div key={index} className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-sm mono text-white hover:bg-white/10 transition-colors cursor-default">
                             {tech}
                          </div>
                       ))}
                       <button className="px-3 py-1.5 rounded border border-dashed border-white/20 text-sm text-secondary hover:text-white hover:border-white/40 transition-colors">
                          + Add Tech
                       </button>
                    </div>
                 </section>

                 {/* Files */}
                 <section>
                    <div className="flex items-center justify-between mb-4">
                       <h3 className="text-sm font-bold text-secondary uppercase tracking-widest">Repository & Files</h3>
                       <span className="text-xs text-secondary">{project.files.length} files</span>
                    </div>
                    
                    <div className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden mb-6">
                       {project.files && project.files.length > 0 ? (
                          <div className="divide-y divide-white/5">
                             {project.files.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors group">
                                   <div className="flex items-center gap-3">
                                      <div className="text-xl opacity-50 group-hover:opacity-100 transition-opacity">📄</div>
                                      <div>
                                         <div className="font-medium text-sm text-white group-hover:text-blue-400 transition-colors">{file.name}</div>
                                         <div className="text-xs text-grey-muted mono">Updated {formatDate(file.uploadedAt)}</div>
                                      </div>
                                   </div>
                                   <a href={file.url} target="_blank" className="btn-secondary text-xs px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                      Download
                                   </a>
                                </div>
                             ))}
                          </div>
                       ) : (
                          <div className="p-8 text-center text-grey-muted">
                             <div className="mb-2 opacity-50">No files uploaded yet</div>
                          </div>
                       )}
                       <div className="p-4 bg-white/5 border-t border-white/5">
                          <FileUploader projectId={params.id} />
                       </div>
                    </div>
                 </section>
              </div>

              {/* Right Column: Meta & Activity */}
              <div className="space-y-8">
                 <div className="glass-card p-6 rounded-2xl border border-white/5 bg-white/5 space-y-4">
                    <h3 className="text-sm font-bold text-white mb-4">Project Metadata</h3>
                    
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                       <span className="text-secondary text-sm">Created</span>
                       <span className="mono text-sm">{formatDate(project.createdAt)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                       <span className="text-secondary text-sm">Project ID</span>
                       <span className="mono text-xs bg-black/50 px-2 py-1 rounded text-secondary">{params.id.slice(0, 8)}...</span>
                    </div>
                    <div className="flex justify-between items-center py-2 mb-2">
                       <span className="text-secondary text-sm">Contributors</span>
                       <div className="flex -space-x-2">
                          <div className="w-6 h-6 rounded-full bg-blue-500 border border-black"></div>
                          <div className="w-6 h-6 rounded-full bg-purple-500 border border-black"></div>
                       </div>
                    </div>
                 </div>

                 <div>
                    <h3 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">Recent Activity</h3>
                    <ActivityLog activities={activities.slice(0, 5)} />
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}
