export default function Home() {
  return (
    <main className="min-h-screen pt-16 relative">
      {/* Hero Section */}
      <section className="container-custom section min-h-screen flex flex-col justify-center items-center text-center relative z-10 -mt-20">
        <div className="space-y-8 max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-secondary mb-4 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="mono text-xs">v1.0.0 Stable</span>
          </div>

          {/* Hero Title */}
          <h1 className="logo-hero text-6xl md:text-8xl tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 pb-2">
            ForgeSpace
          </h1>
          
          <p className="text-xl md:text-2xl text-secondary font-light max-w-3xl mx-auto leading-relaxed">
            The <span className="code text-white">serverless</span> workspace for modern technical teams.
            <br className="hidden md:block" />
            Collaboration without the clutter.
          </p>
          
          <div className="flex flex-col md:flex-row gap-5 justify-center mt-12 items-center">
            <a href="/api/auth/signin" className="btn-primary text-base px-10 py-4 h-14">
              Get Started <span className="ml-2">→</span>
            </a>
            <a href="#features" className="text-secondary hover:text-white transition-colors text-sm font-medium border-b border-white/20 hover:border-white pb-0.5">
              Read Documentation
            </a>
          </div>

          {/* Code Snippet Preview */}
          <div className="mt-16 mx-auto max-w-3xl glass-card rounded-xl border border-white/5 bg-black/50 p-4 transform rotate-1 hover:rotate-0 transition-transform duration-500">
            <div className="flex gap-2 mb-4 px-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>
            <pre className="text-left font-mono text-sm text-secondary overflow-x-auto p-2">
              <code>
                <span className="text-purple-400">const</span> <span className="text-blue-400">workspace</span> = <span className="text-yellow-400">await</span> forge.<span className="text-blue-400">create</span>({'{'}{'\n'}
                {'  '}name: <span className="text-green-400">"Engineering"</span>,{'\n'}
                {'  '}privacy: <span className="text-green-400">"encrypted"</span>,{'\n'}
                {'  '}mode: <span className="text-green-400">"collaborative"</span>{'\n'}
                {'}'});
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Features Section - Bento Grid */}
      <section id="features" className="container-custom section py-32 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Designed for <span className="font-serif italic font-light opacity-80">flow state</span>
          </h2>
          <p className="text-secondary max-w-xl mx-auto text-lg">
            Every pixel serves a purpose. No distractions, just pure productivity.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Card 1 */}
          <div className="card md:col-span-2 group">
            <div className="text-4xl mb-6 opacity-80 group-hover:scale-110 transition-transform duration-300">◆</div>
            <h3 className="text-2xl font-semibold mb-3">Workspace Management</h3>
            <p className="text-secondary leading-relaxed max-w-md">
              Organize projects into isolated environments. Invite team members with granular <span className="code">RBAC</span> permissions and maintain complete separation of concerns.
            </p>
          </div>
          
          {/* Card 2 */}
          <div className="card group">
            <div className="text-4xl mb-6 opacity-80 group-hover:scale-110 transition-transform duration-300">◉</div>
            <h3 className="text-2xl font-semibold mb-3">Real-time Sync</h3>
            <p className="text-secondary leading-relaxed">
              Instant state propagation across all connected clients using serverless adapters.
            </p>
          </div>
          
          {/* Card 3 */}
          <div className="card group">
            <div className="text-4xl mb-6 opacity-80 group-hover:scale-110 transition-transform duration-300">◈</div>
            <h3 className="text-2xl font-semibold mb-3">Audit Logs</h3>
            <p className="text-secondary leading-relaxed">
              Immutable activity streams for security compliance and team accountability.
            </p>
          </div>

          {/* Card 4 - Wide */}
          <div className="card md:col-span-2 group">
            <div className="flex items-center justify-between mb-6">
              <div className="text-4xl opacity-80 group-hover:scale-110 transition-transform duration-300">⚡</div>
              <div className="tech-badge text-xs">Powered by Next.js 14</div>
            </div>
            <h3 className="text-2xl font-semibold mb-3">Zero-Config Deployment</h3>
            <p className="text-secondary leading-relaxed max-w-lg">
              Push to deploy. ForgeSpace handles the infrastructure, scaling, and database optimizations so you can focus on shipping code.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-custom section py-32 text-center relative z-10 border-t border-white/5">
        <div className="absolute inset-0 bg-spotlight opacity-50 pointer-events-none" />
        <div className="max-w-3xl mx-auto space-y-8 relative">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
            Ready to ship?
          </h2>
          <p className="text-xl text-secondary font-light">
            Join thousands of developers building on ForgeSpace.
          </p>
          <div className="pt-8">
            <a href="/api/auth/signin" className="btn-primary text-lg px-12 py-4 h-16">
              Initialize Workspace
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
