'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import WorkspaceCard from '@/components/WorkspaceCard';
import ActivityLog from '@/components/ActivityLog';
import { Button, Card, EmptyState, Skeleton } from '@/components/ui';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // Dynamic greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };
  
  const [workspaces, setWorkspaces] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!session) return;
      
      try {
        setLoading(true);
        setError(null);

        // Fetch workspaces and activities in parallel
        const [workspacesRes, activitiesRes] = await Promise.all([
          fetch('/api/workspace'),
          fetch('/api/activity?limit=5')
        ]);

        if (!workspacesRes.ok || !activitiesRes.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const workspacesData = await workspacesRes.json();
        const activitiesData = await activitiesRes.json();

        setWorkspaces(workspacesData.workspaces || []);
        setActivities(activitiesData.activities || []);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError('Failed to load dashboard data. Please refresh.');
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchDashboardData();
    }
  }, [session]);

  const activeProjectsCount = workspaces.reduce((acc, ws) => acc + (ws.projectCount || 0), 0);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="fixed inset-y-0 left-0 w-80 pointer-events-none hidden md:block" />
        <Sidebar />
        <main className="md:pl-80 max-w-7xl mx-auto space-y-12">
          <div className="space-y-4">
            <Skeleton className="h-12 w-1/3" />
            <Skeleton className="h-6 w-1/4" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-48">
                <Skeleton className="h-full w-full" />
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      {/* Visual Alignment for Sidebar */}
      <div className="fixed inset-y-0 left-0 w-80 pointer-events-none hidden md:block" />
      <Sidebar />

      {/* Main Content Area */}
      <main className="md:pl-80 max-w-7xl mx-auto space-y-12">
        {/* Welcome Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 opacity-70">
              <span className="mono text-xs text-secondary animate-pulse">● Online</span>
              <span className="h-px w-8 bg-grey-border"></span>
              <span className="mono text-xs uppercase tracking-widest text-grey-muted">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </div>
            {error && (
              <div className="bg-syntax-red/10 border border-syntax-red/20 text-syntax-red px-4 py-2 rounded text-sm mb-4">
                {error}
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
              {getGreeting()}, {session?.user?.name?.split(' ')[0] || 'Developer'}
            </h1>
            <p className="text-secondary text-lg font-light max-w-xl">
              You have <span className="text-white font-medium">{activeProjectsCount} active projects</span> across your workspaces.
            </p>
          </div>
          
          <Link href="/workspace/new">
            <Button variant="primary" className="group h-12 px-8">
              <span className="mr-2 text-xl group-hover:rotate-90 transition-transform duration-300">+</span>
              New Workspace
            </Button>
          </Link>
        </header>

        {/* Workspaces Grid */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          <div className="flex items-center justify-between mb-8">
             <h2 className="text-2xl font-semibold tracking-tight">Your Workspaces</h2>
             <div className="h-px flex-1 bg-grey-border ml-6"></div>
          </div>
          
          {workspaces.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workspaces.map((workspace) => (
                <WorkspaceCard 
                  key={workspace._id} 
                  workspace={workspace} 
                  projectCount={workspace.projectCount} 
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="◆"
              title="No workspaces yet"
              description="Start by creating your first secure environment for collaboration."
              action={{
                label: "Initialize Workspace",
                href: "/workspace/new"
              }}
            />
          )}
        </section>

        {/* Recent Activity Section */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <div className="flex items-center justify-between mb-8">
             <h2 className="text-2xl font-semibold tracking-tight">Recent Activity</h2>
             <div className="h-px flex-1 bg-grey-border ml-6"></div>
          </div>
          <ActivityLog activities={activities} />
        </section>
      </main>
    </div>
  );
}
