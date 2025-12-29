export default function Home() {
  return (
    <main className="min-h-screen pt-16 relative overflow-hidden">
      {/* Architectural Background Animations */}
      <div className="architectural-grid"></div>
      <div className="isometric-grid"></div>
      <div className="scan-line"></div>
      
      {/* Blueprint Lines */}
      <div className="blueprint-lines">
        <div className="blueprint-line" style={{ top: '10%' }}></div>
        <div className="blueprint-line" style={{ top: '30%' }}></div>
        <div className="blueprint-line" style={{ top: '60%' }}></div>
        <div className="blueprint-line" style={{ top: '85%' }}></div>
      </div>

      {/* Floating Particles */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${100 + Math.random() * 20}%`,
              animationDelay: `${Math.random() * -20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

      {/* Floating Geometric Shapes */}
      <div style={{ position: 'fixed', top: '20%', right: '10%', pointerEvents: 'none', zIndex: 1 }}>
        <div className="floating-shape square" style={{ opacity: 0.15 }}></div>
      </div>
      <div style={{ position: 'fixed', bottom: '15%', left: '15%', pointerEvents: 'none', zIndex: 1 }}>
        <div className="floating-shape circle" style={{ opacity: 0.12 }}></div>
      </div>
      <div style={{ position: 'fixed', top: '50%', left: '5%', pointerEvents: 'none', zIndex: 1 }}>
        <div className="floating-shape triangle" style={{ opacity: 0.1 }}></div>
      </div>

      {/* Geometric Background Decorations */}
      <div className="shape-circle" style={{ top: '100px', right: '-100px' }}></div>
      <div className="shape-square" style={{ bottom: '200px', left: '-75px' }}></div>
      <div className="shape-triangle" style={{ top: '400px', right: '10%' }}></div>

      {/* Hero Section - Asymmetric */}
      <section className="container-custom section min-h-screen flex items-center relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left: Content Block */}
          <div className="space-y-8 animate-slide-in">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-accent-blue bg-accent-blue/10">
              <div className="status-dot status-active"></div>
              <span className="mono text-sm font-semibold tracking-wide">v1.0.0 Production Ready</span>
            </div>

            <h1 className="text-7xl lg:text-8xl xl:text-9xl font-bold leading-none tracking-tighter">
              Build.
              <br />
              <span className="logo" style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Collaborate.
              </span>
              <br />
              Ship.
            </h1>

            <p className="text-xl lg:text-2xl text-secondary max-w-xl leading-relaxed">
              The modern project collaboration platform built for{' '}
              <span className="code">serverless</span> teams. Secure workspaces, real-time collaboration, zero config.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="btn-block-primary">
                Start Building Free →
              </button>
              <button className="btn-block-secondary">
                View Demo
              </button>
            </div>

            <div className="flex items-center gap-8 pt-8 text-sm opacity-70">
              <div>
                <div className="text-3xl font-bold mono">50K+</div>
                <div className="text-secondary">Active Teams</div>
              </div>
              <div className="h-12 w-px bg-white/20"></div>
              <div>
                <div className="text-3xl font-bold mono">1M+</div>
                <div className="text-secondary">Projects Launched</div>
              </div>
            </div>
          </div>

          {/* Right: Floating Blocks Visualization */}
          <div className="relative h-[600px] hidden lg:block">
            {/* Stacked Blocks with Animation */}
            <div className="block-accent absolute top-0 right-0 w-64 p-6 animate-float" style={{ animationDelay: '0s' }}>
              <div className="text-xs mono text-accent-blue mb-2">WORKSPACE α</div>
              <div className="text-sm font-semibold">Design System 2.0</div>
              <div className="flex gap-2 mt-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-purple to-accent-blue"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-blue to-accent-emerald"></div>
              </div>
            </div>

            <div className="block-hover absolute top-1/3 right-20 w-56 p-5 animate-float" style={{ animationDelay: '1s', border: '3px solid #8B5CF6' }}>
              <div className="text-xs mono text-accent-purple mb-2">PROJECT β</div>
              <div className="text-sm font-semibold">Mobile App Launch</div>
              <div className="mt-4 flex gap-2">
                <span className="tech-badge text-xs">React</span>
                <span className="tech-badge text-xs">Node</span>
              </div>
            </div>

            <div className="block absolute bottom-20 right-10 w-48 p-4 animate-float" style={{ animationDelay: '2s', borderColor: '#10B981' }}>
              <div className="text-xs mono text-accent-emerald mb-2">ACTIVE</div>
              <div className="text-sm font-semibold">12 Contributors</div>
              <div className="status-dot status-active mt-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Block Grid */}
      <section className="container-custom section py-24 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold mb-4">Everything You Need</h2>
          <p className="text-xl text-secondary">Powerful features in a beautiful, block-based interface</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature Block 1 - Large */}
          <div className="block-hover lg:col-span-2 border-accent-top">
            <div className="block-number">01</div>
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold mb-3">Zero-Config Workspaces</h3>
            <p className="text-secondary text-lg leading-relaxed">
              Create isolated environments in seconds. No setup, no hassle. Just pure productivity with{' '}
              <span className="code text-accent-blue">role-based permissions</span> out of the box.
            </p>
            <div className="mt-6 flex gap-3">
              <span className="tech-badge">Instant Setup</span>
              <span className="tech-badge">RBAC</span>
              <span className="tech-badge">Serverless</span>
            </div>
          </div>

          {/* Feature Block 2 */}
          <div className="block-hover" style={{ borderColor: '#8B5CF6' }}>
            <div className="block-number" style={{ color: '#1A1A1A' }}>02</div>
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-3">Real-Time Collaboration</h3>
            <p className="text-secondary leading-relaxed">
              Work together seamlessly with live updates and activity tracking.
            </p>
          </div>

          {/* Feature Block 3 */}
          <div className="block-hover" style={{ borderColor: '#10B981' }}>
            <div className="block-number" style={{ color: '#1A1A1A' }}>03</div>
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-3">Enterprise Security</h3>
            <p className="text-secondary leading-relaxed">
              Bank-level encryption with OAuth 2.0 authentication and granular access control.
            </p>
          </div>

          {/* Feature Block 4 - Wide */}
          <div className="block-hover lg:col-span-2" style={{ borderColor: '#F59E0B' }}>
            <div className="block-number" style={{ color: '#1A1A1A' }}>04</div>
            <div className="text-3xl mb-4">📂</div>
            <h3 className="text-2xl font-bold mb-3">Smart File Management</h3>
            <p className="text-secondary text-lg leading-relaxed">
              Upload, organize, and share files effortlessly with Cloudinary integration. Never lose track of your assets.
            </p>
          </div>

          {/* Feature Block 5 */}
          <div className="block-hover" style={{ borderColor: '#3B82F6' }}>
            <div className="block-number" style={{ color: '#1A1A1A' }}>05</div>
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-3">Activity Insights</h3>
            <p className="text-secondary leading-relaxed">
              Track every action with detailed activity logs and analytics.
            </p>
          </div>

          {/* Feature Block 6 - Accent */}
          <div className="block-accent lg:col-span-3 text-center py-12">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-3xl font-bold mb-4">Developer-First Experience</h3>
            <p className="text-secondary text-lg max-w-2xl mx-auto mb-6">
              Built with Next.js, MongoDB, and modern web standards. Clean APIs, comprehensive docs, and a beautiful interface that developers actually love.
            </p>
            <button className="btn-block-secondary">Explore Documentation →</button>
          </div>
        </div>
      </section>

      {/* CTA Section - Bold Block */}
      <section className="container-custom section py-24 relative z-10">
        <div className="block-accent p-16 text-center relative overflow-hidden animate-glow">
          <div className="shape-circle animate-float" style={{ top: '-50px', right: '-50px', opacity: 0.05 }}></div>
          <div className="relative z-10">
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto">
              Join thousands of teams building better products with ForgeSpace.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="btn-block-primary text-lg px-12 py-5">
                Get Started Free →
              </button>
              <button className="btn-block-secondary text-lg px-12 py-5">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
