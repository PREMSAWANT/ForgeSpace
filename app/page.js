import Link from 'next/link';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center pt-20 pb-32">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-grey-dark/50 backdrop-blur-sm border border-grey-border rounded-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            <span className="mono text-sm text-grey-soft">Enterprise-Grade Collaboration</span>
          </div>

          {/* Hero Logo */}
          <div className="flex justify-center mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            <img 
              src="/forge-space-bgremoved.png" 
              alt="ForgeSpace Logo" 
              className="h-24 md:h-32 object-contain"
            />
          </div>
          
          <p className="text-2xl md:text-3xl text-grey-soft font-light mb-4 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            A <span className="text-white font-medium">serverless collaboration platform</span> built for developers who value clean code, minimal design, and professional workflows.
          </p>

          <p className="text-lg text-grey-muted mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            Manage projects, collaborate with teams, and track progress—without the bloat.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
            <Link href="/api/auth/signin" className="btn-primary group px-8 py-4 text-lg">
              <span>Get Started</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link href="#features" className="btn-secondary px-8 py-4 text-lg">
              Explore Features
            </Link>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-3 justify-center items-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
            <span className="text-sm text-grey-muted">Built with</span>
            {['Next.js', 'MongoDB', 'NextAuth', 'TailwindCSS', 'Vercel'].map((tech) => (
              <span key={tech} className="tech-badge">{tech}</span>
            ))}
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
