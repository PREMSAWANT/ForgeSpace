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
    <aside className="fixed left-6 top-24 bottom-6 w-64 glass-card p-4 flex flex-col justify-between border border-white/10 shadow-2xl z-40 rounded-2xl hidden md:flex">
      <nav className="flex flex-col space-y-2 mt-2">
        <div className="px-4 py-2 mb-4">
          <h3 className="text-xs font-bold text-secondary uppercase tracking-widest opacity-70">Navigation</h3>
        </div>
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
              isActive(item.path)
                ? 'bg-white/10 text-white shadow-lg border border-white/5'
                : 'text-secondary hover:bg-white/5 hover:text-white hover:translate-x-1'
            }`}
          >
            <span className={`text-xl transition-transform duration-300 ${isActive(item.path) ? 'scale-110 text-white' : 'group-hover:text-white'}`}>
              {item.icon}
            </span>
            <span className="font-medium tracking-wide">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 md:block hidden">
        <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="mono text-xs">System Operational</span>
        </div>
      </div>
    </aside>
  );
}
