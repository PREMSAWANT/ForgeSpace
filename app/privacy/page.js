import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-sm text-grey-muted hover:text-white transition-colors mono">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-4">Privacy Policy</h1>
          <p className="text-grey-muted">Last updated: December 30, 2025</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="text-grey-soft leading-relaxed">
              ForgeSpace ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our serverless collaboration platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <h3 className="text-xl font-medium mb-3 text-grey-soft">Account Information</h3>
            <p className="text-grey-soft leading-relaxed mb-4">
              When you create an account, we collect:
            </p>
            <ul className="list-disc list-inside text-grey-soft space-y-2 ml-4">
              <li>Name and email address</li>
              <li>Profile information (username, avatar)</li>
              <li>Authentication credentials (encrypted)</li>
            </ul>

            <h3 className="text-xl font-medium mb-3 mt-6 text-grey-soft">OAuth Information</h3>
            <p className="text-grey-soft leading-relaxed">
              When you sign in with Google or GitHub, we receive basic profile information including your name, email, and profile picture as permitted by your OAuth provider.
            </p>

            <h3 className="text-xl font-medium mb-3 mt-6 text-grey-soft">Usage Data</h3>
            <p className="text-grey-soft leading-relaxed">
              We automatically collect information about your interactions with ForgeSpace, including workspace activity, project updates, and file uploads.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <ul className="list-disc list-inside text-grey-soft space-y-2 ml-4">
              <li>Provide and maintain our services</li>
              <li>Authenticate and authorize access</li>
              <li>Enable collaboration features</li>
              <li>Send important service notifications</li>
              <li>Improve and optimize our platform</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Storage & Security</h2>
            <p className="text-grey-soft leading-relaxed mb-4">
              Your data is stored securely using industry-standard practices:
            </p>
            <ul className="list-disc list-inside text-grey-soft space-y-2 ml-4">
              <li><strong>Database:</strong> MongoDB Atlas with encryption at rest</li>
              <li><strong>Files:</strong> Cloudinary CDN with secure access controls</li>
              <li><strong>Authentication:</strong> NextAuth with encrypted sessions</li>
              <li><strong>Hosting:</strong> Vercel with HTTPS/TLS encryption</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Sharing</h2>
            <p className="text-grey-soft leading-relaxed">
              We do not sell your personal information. We may share data with:
            </p>
            <ul className="list-disc list-inside text-grey-soft space-y-2 ml-4">
              <li><strong>Workspace Members:</strong> Information you share within workspaces is visible to other members</li>
              <li><strong>Service Providers:</strong> Third-party services that help us operate (MongoDB, Cloudinary, Vercel)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p className="text-grey-soft leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-grey-soft space-y-2 ml-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your account</li>
              <li>Export your data</li>
              <li>Opt-out of non-essential communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Cookies & Tracking</h2>
            <p className="text-grey-soft leading-relaxed">
              We use essential cookies for authentication and session management. We do not use third-party tracking or advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
            <p className="text-grey-soft leading-relaxed">
              ForgeSpace is not intended for users under 13 years of age. We do not knowingly collect information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
            <p className="text-grey-soft leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of significant changes via email or platform notification.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-grey-soft leading-relaxed">
              If you have questions about this Privacy Policy, please contact us through your workspace settings or via GitHub.
            </p>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-grey-border flex justify-between items-center">
          <Link href="/terms" className="text-grey-muted hover:text-white transition-colors">
            Terms of Service →
          </Link>
          <Link href="/license" className="text-grey-muted hover:text-white transition-colors">
            License →
          </Link>
        </div>
      </div>
    </div>
  );
}
