import './globals.css'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import SessionProvider from '@/components/SessionProvider';
import Navbar from '@/components/Navbar';
import AnimatedBackground from '@/components/AnimatedBackground';

export const metadata = {
  title: 'ForgeSpace - Developer Edition',
  description: 'Enterprise-grade, serverless collaboration platform for technical teams. Built with JetBrains Mono and a VS Code inspired aesthetic.',
  icons: {
    icon: '/forge-space.png',
  },
}

export default async function RootLayout({ children }) {
  // Make session optional - don't crash if auth fails
  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.warn('Session initialization failed:', error.message);
  }

  return (
    <html lang="en">
      <body className="bg-black text-white selection:bg-white selection:text-black min-h-screen relative overflow-x-hidden">
        {/* Animated Geometric Background */}
        <AnimatedBackground />
        
        {/* Global Ambience */}
        <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0 opacity-30 animate-gradient" />
        <div className="fixed top-0 left-0 right-0 h-[600px] bg-spotlight pointer-events-none z-0" />
        
        <SessionProvider session={session}>
          {/* Main Layout Container */}
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
