'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import ProjectCard from '@/components/ProjectCard';
import { Button, Input, Skeleton, Card, Select } from '@/components/ui';

export default function ProjectsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Realistically this would be a fetch from /api/project
  const [projects] = useState([
    { _id: '1', title: 'API Gateway', status: 'active', techStack: ['Golang', 'Docker'], description: 'Edge service for internal tools' },
    { _id: '2', title: 'UI Kit', status: 'completed', techStack: ['React', 'CSS'], description: 'Modular design system' },
    { _id: '3', title: 'Data Migration', status: 'on-hold', techStack: ['Python', 'SQL'], description: 'Legacy database transition' },
    { _id: '4', title: 'Mobile App', status: 'active', techStack: ['Flutter', 'Firebase'], description: 'Field service companion app' },
    { _id: '5', title: 'Auth Service', status: 'active', techStack: ['Node.js', 'JWT'], description: 'Centralized authentication provider' }
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

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: 'all', label: 'All Projects' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'on-hold', label: 'On-Hold' }
  ];

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="fixed inset-y-0 left-0 w-80 pointer-events-none hidden md:block" />
        <Sidebar />
        <main className="md:pl-80 max-w-7xl mx-auto space-y-12">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
              <div className="space-y-4">
                 <Skeleton className="h-10 w-1/3" />
                 <Skeleton className="h-12 w-full" />
              </div>
              <Skeleton className="h-12 w-1/2 justify-self-end" />
           </div>
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {[1, 2, 3, 4, 5, 6].map((i) => (
               <Card key={i} className="h-56">
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
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex-1">
             <h1 className="text-4xl font-bold tracking-tight mb-6">Consolidated Projects</h1>
             <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <Input 
                  placeholder="Search projects..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md"
                />
                <Select
                  options={statusOptions}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full md:w-56"
                />
             </div>
          </div>
          <Link href="/project/new">
            <Button variant="primary" className="h-12 px-8 whitespace-nowrap">
              Launch Project
            </Button>
          </Link>
        </header>

        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
           <div className="flex items-center justify-between mb-8 text-grey-muted text-sm uppercase tracking-widest font-bold">
              <span>{filteredProjects.length} matching deployments</span>
              <div className="h-px flex-1 bg-grey-border ml-6"></div>
           </div>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {filteredProjects.map((project) => (
               <ProjectCard key={project._id} project={project} />
             ))}
           </div>

           {filteredProjects.length === 0 && (
              <div className="py-20 text-center border border-dashed border-grey-border rounded-3xl">
                 <div className="text-4xl mb-4 opacity-20">◉</div>
                 <h3 className="text-xl font-medium text-white mb-2">No projects found</h3>
                 <p className="text-grey-muted">Try changing your filters or launch a new project.</p>
              </div>
           )}
        </section>
      </main>
    </div>
  );
}
