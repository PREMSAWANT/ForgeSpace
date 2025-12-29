import './globals.css'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import SessionProvider from '@/components/SessionProvider';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'ForgeSpace - Project Collaboration Platform',
  description: 'Professional serverless collaboration platform for teams',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className="bg-black text-white selection:bg-white selection:text-black min-h-screen relative overflow-x-hidden">
        {/* Global Ambience */}
        <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0 opacity-30" />
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
