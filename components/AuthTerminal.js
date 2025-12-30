'use client';

import { useState, useEffect, useRef } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Button } from './ui';

export default function AuthTerminal({ mode = 'signin' }) {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState('welcome'); // welcome, input-email, processing
  const terminalRef = useRef(null);

  const title = mode === 'signin' ? 'FORGESPACE_USER_LOGIN' : 'FORGESPACE_USER_REGISTRATION';
  
  useEffect(() => {
    const welcomeSequence = async () => {
      const messages = [
        `[SYSTEM] Initializing ${title}...`,
        `[STATUS] Establishing SSH handshake... SUCCESS`,
        `[INFO] Target: forgespace-prod-01`,
        mode === 'signin' 
          ? '> Enter credentials to access workspace' 
          : '> Initialize new developer profile',
        `$ forge auth --${mode}`
      ];

      for (const msg of messages) {
        setLines(prev => [...prev, msg]);
        await new Promise(r => setTimeout(r, 400));
      }
      setCurrentStep('input-email');
    };

    welcomeSequence();
  }, [mode, title]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!input || isLoading) return;

    const email = input;
    setLines(prev => [...prev, `[USER] ${email}`, `[AUTH] Requesting magic-link for ${email}...`]);
    setIsLoading(true);
    setCurrentStep('processing');

    try {
      await signIn('email', { email, callbackUrl: '/dashboard', redirect: false });
      setLines(prev => [
        ...prev, 
        `[SUCCESS] Magic link dispatched to ${email}`,
        `[WAIT] Please check your inbox to complete initialization.`
      ]);
    } catch (err) {
      setLines(prev => [...prev, `[ERROR] Failed to dispatch initialization link. Try again.`]);
      setCurrentStep('input-email');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = async (provider) => {
    setLines(prev => [...prev, `[AUTH] Redirecting to ${provider} handshake...`]);
    setIsLoading(true);
    await signIn(provider, { callbackUrl: '/dashboard' });
  };

  return (
    <div className="w-full max-w-2xl mx-auto font-mono">
      <div className="bg-grey-charcoal/80 backdrop-blur-xl border border-grey-border rounded-lg overflow-hidden shadow-2xl">
        {/* Terminal Header */}
        <div className="bg-grey-dark px-4 py-2 flex items-center justify-between border-b border-grey-border">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-syntax-red/50"></div>
            <div className="w-3 h-3 rounded-full bg-syntax-orange/50"></div>
            <div className="w-3 h-3 rounded-full bg-syntax-green/50"></div>
          </div>
          <div className="text-[10px] text-grey-muted uppercase tracking-widest">
            {mode === 'signin' ? 'auth_session --login' : 'auth_session --register'}
          </div>
          <div className="w-12"></div> {/* Spacer */}
        </div>

        {/* Terminal Body */}
        <div 
          ref={terminalRef}
          className="p-6 h-[400px] overflow-y-auto text-sm leading-relaxed custom-scrollbar scroll-smooth"
        >
          {lines.map((line, i) => (
            <div 
              key={i} 
              className={`mb-1 ${
                line.startsWith('[ERROR]') ? 'text-syntax-red' : 
                line.startsWith('[SUCCESS]') ? 'text-syntax-green' :
                line.startsWith('[AUTH]') ? 'text-syntax-blue' :
                line.startsWith('[SYSTEM]') ? 'text-white/40' :
                'text-white'
              }`}
            >
              <span className="opacity-30 mr-2">[{i.toString().padStart(2, '0')}]</span>
              {line}
            </div>
          ))}

          {currentStep === 'input-email' && (
            <form onSubmit={handleEmailSubmit} className="mt-4 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-syntax-green">admin@fs:~$</span>
                <input
                  type="email"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="enter_email_address"
                  autoFocus
                  className="bg-transparent border-none outline-none flex-1 text-white placeholder:text-white/20"
                  required
                />
              </div>
              
              <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
                <button 
                  type="button" 
                  onClick={() => handleOAuth('google')}
                  className="text-xs text-grey-muted hover:text-white transition-colors flex items-center gap-2"
                >
                  [ G ] AUTH_GOOGLE
                </button>
                <button 
                  type="button" 
                  onClick={() => handleOAuth('github')}
                  className="text-xs text-grey-muted hover:text-white transition-colors flex items-center gap-2"
                >
                  [ H ] AUTH_GITHUB
                </button>
              </div>
            </form>
          )}

          {currentStep === 'processing' && (
            <div className="mt-4 flex items-center gap-2 text-syntax-blue animate-pulse">
              <span className="animate-spin inline-block">◌</span>
              SECURE_HANDSHAKE_IN_PROGRESS...
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-grey-muted">
        {mode === 'signin' ? (
          <>
            New to ForgeSpace?{' '}
            <Link href="/auth/signup" className="text-white hover:underline">
              Initialize New Account
            </Link>
          </>
        ) : (
          <>
            Already initialized?{' '}
            <Link href="/auth/signin" className="text-white hover:underline">
              Access Existing Session
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
