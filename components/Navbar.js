'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { getInitials } from '@/utils/helpers';
import { Button, Avatar } from './ui';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="border-b border-grey-border fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Logo with technical emphasis */}
        <div className="flex items-center gap-4">
          <Link 
            href="/" 
            className="logo text-xl font-normal tracking-tight hover:text-grey-soft transition-colors"
          >
            ForgeSpace
          </Link>
          <span className="text-grey-border">/</span>
          <span className="mono text-[10px] uppercase tracking-widest text-grey-muted">main</span>
        </div>

        {/* Right side navigation */}
        <div className="flex items-center gap-6">
          {session ? (
            <>
              {/* User info and menu */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <Avatar 
                    user={session.user} 
                    size="md" 
                  />
                  <div className="hidden md:block">
                    <div className="text-sm font-medium">{session.user.name}</div>
                    <div className="text-xs text-grey-muted">{session.user.email}</div>
                  </div>
                </div>
                
                {/* Sign out button */}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </div>
            </>
          ) : (
            <Link href="/api/auth/signin">
              <Button variant="primary">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
