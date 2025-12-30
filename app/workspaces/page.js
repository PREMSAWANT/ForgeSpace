'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import WorkspaceCard from '@/components/WorkspaceCard';
import { Button, Input, Skeleton, Container, Card } from '@/components/ui';

export default function WorkspacesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Realistically this would be a fetch from /api/workspace
  const [workspaces, setWorkspaces] = useState([
    { _id: '1', name: 'Engineering', ownerId: { name: 'Demo User' }, members: [1,2,3,4] },
    { _id: '2', name: 'Marketing', ownerId: { name: 'Demo User' }, members: [1,2] },
    { _id: '3', name: 'Design System', ownerId: { name: 'Demo User' }, members: [1,2,3] },
    { _id: '4', name: 'Product Growth', ownerId: { name: 'Demo User' }, members: [1,2,3,4,5,6] }
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

  const filteredWorkspaces = workspaces.filter(ws => 
    ws.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="fixed inset-y-0 left-0 w-80 pointer-events-none hidden md:block" />
        <Sidebar />
        <main className="md:pl-80 max-w-7xl mx-auto space-y-12">
          <div className="flex justify-between items-end">
            <div className="space-y-4 w-full max-w-md">
              <Skeleton className="h-10 w-1/2" />
              <Skeleton className="h-12 w-full" />
            </div>
            <Skeleton className="h-12 w-40 hidden md:block" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
      <div className="fixed inset-y-0 left-0 w-80 pointer-events-none hidden md:block" />
      <Sidebar />

      <main className="md:pl-80 max-w-7xl mx-auto space-y-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Workspaces</h1>
            <Input 
              placeholder="Filter by workspace name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>
          
          <Link href="/workspace/new">
            <Button variant="primary" className="h-12 px-8">
              Initialize New Workspace
            </Button>
          </Link>
        </header>

        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          <div className="flex items-center justify-between mb-8 text-grey-muted text-sm uppercase tracking-widest font-bold">
             <span>{filteredWorkspaces.length} Total Environments</span>
             <div className="h-px flex-1 bg-grey-border ml-6"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkspaces.map((workspace) => (
              <WorkspaceCard key={workspace._id} workspace={workspace} />
            ))}
          </div>

          {filteredWorkspaces.length === 0 && (
             <div className="py-20 text-center border border-dashed border-grey-border rounded-3xl">
                <div className="text-4xl mb-4 opacity-20">▣</div>
                <h3 className="text-xl font-medium text-white mb-2">No workspaces found</h3>
                <p className="text-grey-muted">Try adjusting your search or create a new one.</p>
             </div>
          )}
        </section>
      </main>
    </div>
  );
}
