'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      if (!session) return;
      try {
        const res = await fetch('/api/workspace');
        if (res.ok) {
          const data = await res.json();
          setWorkspaces(data.workspaces || []);
        }
      } catch (error) {
        console.error('Sidebar workspace fetch error:', error);
      }
    };

    fetchWorkspaces();
  }, [session]);

  const isActive = (path) => pathname === path;

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '◆' },
    { name: 'Operational Logs', path: '/activity', icon: '◐' },
  ];

  return (
    <aside className="fixed left-6 top-20 bottom-6 w-60 bg-grey-dark/40 backdrop-blur-xl p-2 flex flex-col justify-between border border-grey-border z-40 rounded-md hidden md:flex">
      <nav className="flex flex-col space-y-1 mt-2">
        <div className="px-3 py-2 mb-2">
          <h3 className="text-[10px] font-bold text-grey-muted uppercase tracking-[0.2em]">explorer</h3>
        </div>
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-sm transition-all duration-200 group ${
              isActive(item.path)
                ? 'bg-grey-charcoal text-white border-l-2 border-l-white border border-grey-border'
                : 'text-grey-muted hover:bg-grey-charcoal/50 hover:text-white border border-transparent'
            }`}
          >
            <span className={`text-sm ${isActive(item.path) ? 'text-white' : 'group-hover:text-white'}`}>
              {item.icon}
            </span>
            <span className="text-sm font-medium tracking-tight">{item.name}</span>
          </Link>
        ))}

        {workspaces.length > 0 && (
          <div className="pt-6 pb-2">
            <div className="px-3 py-2 mb-1">
              <h3 className="text-[10px] font-bold text-grey-muted uppercase tracking-[0.2em]">workspaces</h3>
            </div>
            {workspaces.map((ws) => (
              <Link
                key={ws._id}
                href={`/workspace/${ws._id}`}
                className={`flex items-center gap-3 px-3 py-1.5 rounded-sm transition-all duration-200 group ${
                  pathname.includes(`/workspace/${ws._id}`)
                    ? 'text-white font-semibold'
                    : 'text-grey-muted hover:text-white'
                }`}
              >
                <span className="text-secondary opacity-40 group-hover:opacity-100 text-xs">▣</span>
                <span className="text-[13px] truncate">{ws.name}</span>
              </Link>
            ))}
          </div>
        )}
      </nav>

      <div className="p-3 border-t border-grey-border">
        <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
          <div className="w-1.5 h-1.5 rounded-full bg-syntax-green animate-pulse"></div>
          <span className="mono text-[10px] uppercase tracking-widest text-grey-muted">sys_ready</span>
        </div>
      </div>
    </aside>
  );
}
