'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '◆' },
    { name: 'Workspaces', path: '/workspaces', icon: '▣' },
    { name: 'Projects', path: '/projects', icon: '◉' },
    { name: 'Activity', path: '/activity', icon: '◐' },
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
