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
  
  // Realistically this would be a fetch from /api/activity
  const [activities] = useState([
    { user: { name: 'Alice', image: null }, action: 'deployed', target: 'production', createdAt: new Date() },
    { user: { name: 'Bob', image: null }, action: 'created', target: 'new-feature', createdAt: new Date(Date.now() - 3600000) },
    { user: { name: 'Charlie', image: null }, action: 'invited', target: 'Dave', createdAt: new Date(Date.now() - 7200000) },
    { user: { name: 'Alice', image: null }, action: 'merged', target: 'main', createdAt: new Date(Date.now() - 86400000) },
    { user: { name: 'Bob', image: null }, action: 'commented', target: 'UI refinement', createdAt: new Date(Date.now() - 172800000) }
  ]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

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
