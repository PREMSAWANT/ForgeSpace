'use client';

import AuthTerminal from '@/components/AuthTerminal';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-16">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Link href="/" className="inline-block mb-6 hover:opacity-80 transition-opacity">
            <img src="/forge-space-bgremoved.png" alt="ForgeSpace" className="h-12 object-contain mx-auto" />
          </Link>
          <h1 className="text-2xl font-bold mb-2 uppercase tracking-widest text-grey-soft">System_Initialization</h1>
          <p className="text-grey-muted text-sm mono">Create your global developer identity</p>
        </div>

        <AuthTerminal mode="signup" />
      </div>
    </div>
  );
}
