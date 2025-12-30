import Link from 'next/link';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center pt-24 pb-32">
          {/* Left Column: Text Content */}
          <div className="text-left space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-grey-dark/50 backdrop-blur-sm border border-grey-border rounded-sm">
              <span className="w-1.5 h-1.5 bg-syntax-green rounded-full animate-pulse"></span>
              <span className="mono text-[10px] uppercase tracking-[0.2em] text-grey-soft">v2.0.0_stable</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1]">
                Technical <br />
                <span className="text-grey-muted">Collaboration</span> <br />
                Refined.
              </h1>
              
              <p className="text-xl md:text-2xl text-grey-soft font-light max-w-xl leading-relaxed">
                ForgeSpace: A <span className="text-white font-medium mono decoration-syntax-blue underline underline-offset-4">serverless hub</span> for builders who prioritize clean code and minimalist engineering.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-start pt-4">
              <Link href="/api/auth/signin" className="btn-primary group px-8 py-3.5 text-base">
                <span>Start Building</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform font-mono">_&gt;</span>
              </Link>
              <Link href="#features" className="btn-secondary px-8 py-3.5 text-base">
                View Spec
              </Link>
            </div>
          </div>

          {/* Right Column: Prominent Logo Area with Editor Tabs */}
          <div className="relative flex justify-center lg:justify-end animate-in fade-in slide-in-from-right-12 duration-1000 delay-200">
            <div className="relative group w-full max-w-2xl bg-grey-charcoal/30 backdrop-blur-md border border-white/5 rounded-lg overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/10">
              {/* Editor Tab Bar */}
              <div className="flex bg-grey-dark/80 border-b border-white/5 items-center">
                <div className="flex">
                  <div className="px-4 py-3 bg-grey-charcoal border-r border-white/5 flex items-center gap-2 group/tab">
                    <span className="text-syntax-blue text-xs">◆</span>
                    <span className="text-xs text-white/90 font-medium">branding.asset</span>
                    <span className="text-[10px] text-grey-muted opacity-0 group-hover/tab:opacity-100 transition-opacity ml-2">×</span>
                  </div>
                  <div className="px-4 py-3 border-r border-white/5 flex items-center gap-2 hover:bg-white/5 transition-colors cursor-pointer group/tab">
                    <span className="text-syntax-green text-xs">◎</span>
                    <span className="text-xs text-grey-muted">identity.svg</span>
                    <span className="text-[10px] text-grey-muted opacity-0 group-hover/tab:opacity-100 transition-opacity ml-2">×</span>
                  </div>
                  <div className="px-4 py-3 border-r border-white/5 flex items-center gap-2 hover:bg-white/5 transition-colors cursor-pointer hidden md:flex group/tab">
                    <span className="text-syntax-orange text-xs">◈</span>
                    <span className="text-xs text-grey-muted">spec.json</span>
                    <span className="text-[10px] text-grey-muted opacity-0 group-hover/tab:opacity-100 transition-opacity ml-2">×</span>
                  </div>
                </div>
                <div className="flex-1 flex justify-end px-3">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full border border-white/10"></div>
                    <div className="w-2 h-2 rounded-full border border-white/10"></div>
                  </div>
                </div>
              </div>

              {/* Main Logo Content Pane */}
              <div className="relative p-12 flex items-center justify-center min-h-[400px]">
                {/* Decorative Glow */}
                <div className="absolute inset-0 bg-white/5 blur-[100px] pointer-events-none" />
                
                <img 
                  src="/forge-space-bgremoved.png" 
                  alt="ForgeSpace Logo" 
                  className="h-48 md:h-64 lg:h-72 w-auto object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.1)] relative z-10 transition-transform duration-700 hover:scale-110"
                />

                {/* Breadcrumbs Placeholder */}
                <div className="absolute top-4 left-6 mono text-[10px] text-grey-muted/50 flex items-center gap-2">
                  <span>assets</span>
                  <span>/</span>
                  <span>branding</span>
                  <span>/</span>
                  <span className="text-grey-muted">render.png</span>
                </div>
              </div>

              {/* Syntax Decorative Label */}
              <div className="absolute bottom-4 right-4 bg-black border border-grey-border px-3 py-1.5 rounded-sm mono text-[10px] text-syntax-blue z-20">
                ACTIVE_TAB_VIEW
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-grey-border rounded-full p-1">
            <div className="w-1 h-2 bg-white rounded-full mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need.<br />Nothing You Don't.
            </h2>
            <p className="text-xl text-grey-muted max-w-2xl mx-auto">
              Clean, minimal, and powerful collaboration tools for modern teams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="card group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-grey-muted leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-32 px-6 relative bg-grey-charcoal/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Built for Scale.<br />Designed for Simplicity.
            </h2>
            <p className="text-xl text-grey-muted max-w-2xl mx-auto">
              Serverless architecture that scales automatically while keeping costs minimal.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {architecture.map((item, index) => (
              <div 
                key={item.title}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-grey-dark border border-grey-border flex items-center justify-center">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h3 className="text-lg font-semibold mb-3 mono">{item.title}</h3>
                <p className="text-grey-muted text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build Something Great?
          </h2>
          <p className="text-xl text-grey-muted mb-12 max-w-2xl mx-auto">
            Join developers who value clean code and minimal design.
          </p>
          <Link href="/api/auth/signin" className="btn-primary px-12 py-5 text-xl group">
            <span>Start Free</span>
            <span className="ml-3 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-grey-border py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src="/forge-space-bgremoved.png" alt="ForgeSpace" className="h-8 object-contain" />
              </div>
              <p className="text-grey-muted text-sm max-w-sm">
                A serverless collaboration platform built for developers who value clean code and professional workflows.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-grey-muted">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="/api/auth/signin" className="hover:text-white transition-colors">Sign In</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-sm">Resources</h4>
              <ul className="space-y-2 text-sm text-grey-muted">
                <li><a href="https://github.com" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="https://vercel.com" className="hover:text-white transition-colors">Deploy</a></li>
                <li><a href="https://nextjs.org/docs" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-grey-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-grey-muted">
              © 2025 ForgeSpace. Built with focus on clean code and developer experience.
            </p>
            <div className="flex gap-6 text-sm text-grey-muted">
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="hover:text-white transition-colors">License</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Feature data
const features = [
  {
    icon: '🔐',
    title: 'Secure Authentication',
    description: 'OAuth integration with Google and GitHub. Session management with MongoDB. Enterprise-grade security out of the box.',
  },
  {
    icon: '🗂️',
    title: 'Workspace Management',
    description: 'Create unlimited workspaces. Organize projects by team, client, or initiative with granular access control.',
  },
  {
    icon: '📊',
    title: 'Project Tracking',
    description: 'Track project status, tech stack, and files in one place. Simple yet powerful organization.',
  },
  {
    icon: '👥',
    title: 'Role-Based Access',
    description: 'Owner, Admin, Member, and Viewer roles. Fine-grained permissions for team collaboration.',
  },
  {
    icon: '📁',
    title: 'File Management',
    description: 'Cloudinary integration for files and assets. CDN-powered delivery for global teams.',
  },
  {
    icon: '📝',
    title: 'Activity Logs',
    description: 'Complete audit trail of all actions. Know who did what and when across your organization.',
  },
];

const architecture = [
  {
    icon: '⚡',
    title: 'Serverless Functions',
    description: 'Next.js API routes that scale automatically. Pay only for what you use.',
  },
  {
    icon: '🗄️',
    title: 'MongoDB Atlas',
    description: 'Cloud database with automatic backups and scaling. Always-on availability.',
  },
  {
    icon: '🌍',
    title: 'Global CDN',
    description: 'Vercel Edge Network for instant page loads worldwide. Cloudinary for media.',
  },
];
