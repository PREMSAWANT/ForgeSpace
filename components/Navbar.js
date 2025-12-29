'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { getInitials } from '@/utils/helpers';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-grey-charcoal border-b border-grey-mid fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo with Milker font */}
        <Link 
          href="/" 
          className="logo text-2xl font-normal tracking-tight hover:opacity-80 transition-opacity"
        >
          ForgeSpace
        </Link>

        {/* Right side navigation */}
        <div className="flex items-center gap-6">
          {session ? (
            <>
              {/* User info and menu */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center font-semibold text-sm">
                    {getInitials(session.user.name)}
                  </div>
                  <div className="hidden md:block">
                    <div className="text-sm font-medium">{session.user.name}</div>
                    <div className="text-xs text-muted">{session.user.email}</div>
                  </div>
                </div>
                
                {/* Sign out button */}
                <button
                  onClick={() => signOut()}
                  className="btn-secondary text-sm px-4 py-2"
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <Link href="/api/auth/signin" className="btn-primary px-6 py-2">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
