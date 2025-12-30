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

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 items-center pt-8">
              <span className="text-[10px] uppercase tracking-widest text-grey-muted mr-4">stack://</span>
              {['Next.js', 'MongoDB', 'NextAuth', 'Cloudinary'].map((tech) => (
                <span key={tech} className="px-2 py-1 text-[10px] mono border border-grey-border bg-grey-charcoal/30 text-grey-soft">{tech}</span>
              ))}
            </div>
          </div>

          {/* Right Column: Prominent Logo Area */}
          <div className="relative flex justify-center lg:justify-end animate-in fade-in slide-in-from-right-12 duration-1000 delay-200">
            <div className="relative group">
              {/* Decorative Glow */}
              <div className="absolute -inset-12 bg-white/5 blur-[100px] rounded-full group-hover:bg-white/10 transition-colors duration-700" />
              
              {/* Main Logo Container */}
              <div className="relative z-10 p-8 border border-white/5 bg-grey-charcoal/20 backdrop-blur-sm rounded-lg hover:border-white/10 transition-all duration-500">
                <img 
                  src="/forge-space-bgremoved.png" 
                  alt="ForgeSpace Logo" 
                  className="h-48 md:h-64 lg:h-80 w-auto object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                />
              </div>
              
              {/* Syntax Decorative Label */}
              <div className="absolute -bottom-4 -right-4 bg-black border border-grey-border px-3 py-1.5 rounded-sm mono text-[10px] text-syntax-blue z-20">
                LATEST_BUILD
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
