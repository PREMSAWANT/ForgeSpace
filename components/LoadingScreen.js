'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  
  const loadingSteps = [
    '[ OK ] Initializing ForgeSpace...',
    '[ OK ] Loading core modules...',
    '[ OK ] Establishing secure connection...',
    '[ OK ] Mounting file system...',
    '[ OK ] Starting development server...',
    '[ OK ] Ready to forge.'
  ];

  useEffect(() => {
    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Animate loading lines
    const lineInterval = setInterval(() => {
      setCurrentLine(prev => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(lineInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 400);

    // Complete loading after animation
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(lineInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>

      <div className="relative z-10 max-w-2xl w-full px-6">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <img 
              src="/forge-space-bgremoved.png" 
              alt="ForgeSpace" 
              className="h-32 w-auto object-contain animate-pulse-slow"
            />
          </div>
          <h1 className="text-3xl font-bold mt-6 tracking-tight">
            ForgeSpace
          </h1>
          <p className="text-grey-muted mono text-xs mt-2 tracking-widest">
            v2.0.0_stable
          </p>
        </div>

        {/* Terminal Loading Section */}
        <div className="bg-grey-charcoal/50 backdrop-blur-sm border border-grey-border rounded-lg p-6 mono text-sm">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-grey-border">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-syntax-red/50" />
              <div className="w-3 h-3 rounded-full bg-syntax-orange/50" />
              <div className="w-3 h-3 rounded-full bg-syntax-green/50" />
            </div>
            <span className="text-[10px] text-grey-muted uppercase tracking-widest ml-2">
              system_boot
            </span>
          </div>

          {/* Loading Lines */}
          <div className="space-y-2 mb-6">
            {loadingSteps.map((step, index) => (
              <div
                key={index}
                className={`transition-all duration-300 ${
                  index <= currentLine ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
              >
                <span className="text-syntax-green mr-2">✓</span>
                <span className="text-grey-soft">{step}</span>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-grey-muted">
              <span>Loading...</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1 bg-grey-dark rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-syntax-blue to-syntax-green transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Blinking Cursor */}
        <div className="text-center mt-8">
          <span className="mono text-grey-muted text-sm animate-pulse">
            Press any key to continue_
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
