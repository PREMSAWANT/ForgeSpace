'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import ActivityLog from '@/components/ActivityLog';
import { Skeleton, Card, Badge } from '@/components/ui';

export default function ActivityPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchActivities = async () => {
      if (!session) return;

      try {
        setLoading(true);
        const res = await fetch('/api/activity?limit=50');
        if (!res.ok) throw new Error('Failed to fetch activities');
        const data = await res.json();
        setActivities(data.activities || []);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError('Could not load system logs.');
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchActivities();
    }
  }, [session]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="fixed inset-y-0 left-0 w-80 pointer-events-none hidden md:block" />
        <Sidebar />
        <main className="md:pl-80 max-w-4xl mx-auto space-y-12">
           <div className="space-y-4">
              <Skeleton className="h-10 w-1/4" />
              <Skeleton className="h-6 w-1/2" />
           </div>
           <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i} className="h-20">
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
      <div className="fixed inset-y-0 left-0 w-80 pointer-events-none hidden md:block" />
      <Sidebar />

      <main className="md:pl-80 max-w-4xl mx-auto space-y-12">
        <header className="animate-in fade-in slide-in-from-bottom-4 duration-700">
           <div className="flex items-center gap-4 mb-4">
              <h1 className="text-4xl font-bold tracking-tight">System Logs</h1>
              <Badge variant="outline">Live Feed</Badge>
           </div>
           <p className="text-grey-muted text-lg font-light leading-relaxed">
              Track global engineering operations, deployment status, and team collaborations in real-time.
           </p>
        </header>

        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
           <div className="flex items-center justify-between mb-8 text-grey-muted text-sm uppercase tracking-widest font-bold">
              <span>Latest Operational Updates</span>
              <div className="h-px flex-1 bg-grey-border ml-6"></div>
           </div>
           
           <Card className="p-0 overflow-hidden border-grey-border bg-grey-charcoal/30 backdrop-blur-sm">
              <ActivityLog activities={activities} />
           </Card>
        </section>
      </main>
    </div>
  );
}
