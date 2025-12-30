'use client';

import { useState, useEffect, useRef } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AuthTerminal({ mode = 'signin' }) {
  const router = useRouter();
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [terminalStep, setTerminalStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const terminalRef = useRef(null);

  const signinSteps = [
    { key: 'username', label: 'IDENTIFY_USER', prompt: 'enter_username_or_email', type: 'text' },
    { key: 'password', label: 'VERIFY_CREDENTIALS', prompt: 'enter_secure_password', type: 'password' }
  ];

  const signupSteps = [
    { key: 'name', label: 'SET_DISPLAY_NAME', prompt: 'enter_full_name', type: 'text' },
    { key: 'username', label: 'SET_USERNAME', prompt: 'enter_unique_username', type: 'text' },
    { key: 'email', label: 'SET_EMAIL', prompt: 'enter_valid_email', type: 'email' },
    { key: 'phone', label: 'SET_PHONE', prompt: 'enter_phone_number', type: 'tel' },
    { key: 'password', label: 'SET_PASSWORD', prompt: 'create_secure_password', type: 'password' },
    { key: 'confirmPassword', label: 'CONFIRM_PASSWORD', prompt: 're-enter_password', type: 'password' }
  ];

  const activeSteps = mode === 'signin' ? signinSteps : signupSteps;
  const title = mode === 'signin' ? 'FORGESPACE_USER_LOGIN' : 'FORGESPACE_USER_REGISTRATION';
  
  useEffect(() => {
    const welcomeSequence = async () => {
      setLines([
        `[SYSTEM] Initializing ${title}...`,
        `[STATUS] Establishing SSH handshake... SUCCESS`,
        mode === 'signin' 
          ? '> Authentication required to access workspace' 
          : '> System initialization: Defining new developer profile',
        `$ forge auth --${mode}`
      ]);
      setTerminalStep(0);
    };

    welcomeSequence();
  }, [mode, title]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const addLog = (msg, type = 'info') => {
    const prefix = type === 'error' ? '[ERROR]' : type === 'success' ? '[SUCCESS]' : type === 'auth' ? '[AUTH]' : '[USER]';
    setLines(prev => [...prev, `${prefix} ${msg}`]);
  };

  const handleStepSubmit = async (e) => {
    e.preventDefault();
    if (!input || isLoading) return;

    const currentStepConfig = activeSteps[terminalStep];
    const value = input;
    
    // Add user input to logs
    addLog(currentStepConfig.type === 'password' ? '********' : value, 'user');
    
    // Update form data
    const updatedData = { ...formData, [currentStepConfig.key]: value };
    setFormData(updatedData);
    setInput('');

    // If more steps remain
    if (terminalStep < activeSteps.length - 1) {
      setTerminalStep(prev => prev + 1);
    } else {
      // Final execution
      executeAuthFlow(updatedData);
    }
  };

  const executeAuthFlow = async (data) => {
    setIsLoading(true);
    addLog(`Executing ${mode} sequence...`, 'auth');

    if (mode === 'signup') {
      if (data.password !== data.confirmPassword) {
        addLog('Password mismatch detected.', 'error');
        setTerminalStep(signupSteps.findIndex(s => s.key === 'password'));
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const result = await res.json();

        if (res.ok) {
          addLog('Profile initialized successfully.', 'success');
          addLog('Redirecting to login gateway...', 'auth');
          setTimeout(() => router.push('/auth/signin'), 1500);
        } else {
          addLog(result.message || 'Initialization failed.', 'error');
          setTerminalStep(0); // Restart
        }
      } catch (err) {
        addLog('Critical system error during initialization.', 'error');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Signin
      try {
        const res = await signIn('credentials', {
          username: data.username,
          password: data.password,
          redirect: false,
          callbackUrl: '/dashboard'
        });

        if (res.ok) {
          addLog('Handshake successful. Session established.', 'success');
          addLog('Loading workspace environment...', 'auth');
          setTimeout(() => router.push('/dashboard'), 1500);
        } else {
          addLog(res.error || 'Authentication denied.', 'error');
          setTerminalStep(0); // Restart
        }
      } catch (err) {
        addLog('Authentication engine failure.', 'error');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleOAuth = async (provider) => {
    addLog(`Redirecting to ${provider} handshake...`, 'auth');
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
          <div className="w-12"></div>
        </div>

        {/* Terminal Body */}
        <div 
          ref={terminalRef}
          className="p-6 h-[450px] overflow-y-auto text-sm leading-relaxed custom-scrollbar scroll-smooth"
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

          {!isLoading && terminalStep < activeSteps.length && (
            <form onSubmit={handleStepSubmit} className="mt-4 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-syntax-blue uppercase tracking-widest opacity-70">
                  {activeSteps[terminalStep].label}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-syntax-green">admin@fs:~$</span>
                  <input
                    type={activeSteps[terminalStep].type}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={activeSteps[terminalStep].prompt}
                    autoFocus
                    className="bg-transparent border-none outline-none flex-1 text-white placeholder:text-white/10"
                    required
                  />
                </div>
              </div>
            </form>
          )}

          {isLoading && (
            <div className="mt-4 flex items-center gap-2 text-syntax-blue animate-pulse">
              <span className="animate-spin inline-block">◌</span>
              SECURE_HANDSHAKE_IN_PROGRESS...
            </div>
          )}

          {terminalStep === 0 && !isLoading && (
            <>
              <div className="flex flex-wrap gap-4 pt-8 mt-8 border-t border-white/5">
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
              
              <div className="mt-6 text-center text-xs text-grey-muted">
                {mode === 'signin' ? (
                  <>
                    New to ForgeSpace?{' '}
                    <Link href="/auth/signup" className="text-white hover:underline transition-colors">
                      Initialize New Account
                    </Link>
                  </>
                ) : (
                  <>
                    Already initialized?{' '}
                    <Link href="/auth/signin" className="text-white hover:underline transition-colors">
                      Access Existing Session
                    </Link>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
