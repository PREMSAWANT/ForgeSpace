import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-sm text-grey-muted hover:text-white transition-colors mono">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-4">Terms of Service</h1>
          <p className="text-grey-muted">Last updated: December 30, 2025</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
            <p className="text-grey-soft leading-relaxed">
              By accessing or using ForgeSpace, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Use License</h2>
            <p className="text-grey-soft leading-relaxed mb-4">
              Permission is granted to use ForgeSpace for personal and commercial collaboration purposes, subject to the following restrictions:
            </p>
            <ul className="list-disc list-inside text-grey-soft space-y-2 ml-4">
              <li>You must not modify or copy the platform's source code without permission</li>
              <li>You must not use ForgeSpace for any illegal or unauthorized purpose</li>
              <li>You must not attempt to decompile or reverse engineer any software</li>
              <li>You must not remove any copyright or proprietary notations</li>
              <li>You must not transfer the platform to another person or entity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Account Responsibilities</h2>
            <h3 className="text-xl font-medium mb-3 text-grey-soft">Account Security</h3>
            <p className="text-grey-soft leading-relaxed mb-4">
              You are responsible for:
            </p>
            <ul className="list-disc list-inside text-grey-soft space-y-2 ml-4">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized access</li>
              <li>Ensuring your account information is accurate and up-to-date</li>
            </ul>

            <h3 className="text-xl font-medium mb-3 mt-6 text-grey-soft">Acceptable Use</h3>
            <p className="text-grey-soft leading-relaxed">
              You agree not to use ForgeSpace to upload, share, or distribute content that is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Workspace & Project Content</h2>
            <p className="text-grey-soft leading-relaxed mb-4">
              You retain all rights to content you upload to ForgeSpace. By uploading content, you grant us:
            </p>
            <ul className="list-disc list-inside text-grey-soft space-y-2 ml-4">
              <li>A license to store, process, and display your content as necessary to provide the service</li>
              <li>Permission to share your content with workspace members you designate</li>
              <li>The right to use aggregated, anonymized data for platform improvements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Service Availability</h2>
            <p className="text-grey-soft leading-relaxed">
              ForgeSpace is provided "as is" without warranties of any kind. We strive for 99.9% uptime but do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue the service at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="text-grey-soft leading-relaxed">
              ForgeSpace and its contributors shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Backup & Loss</h2>
            <p className="text-grey-soft leading-relaxed">
              While we implement regular backups, you are responsible for maintaining your own backups of critical data. We are not liable for any data loss.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Termination</h2>
            <p className="text-grey-soft leading-relaxed mb-4">
              We may terminate or suspend your account immediately, without prior notice, for:
            </p>
            <ul className="list-disc list-inside text-grey-soft space-y-2 ml-4">
              <li>Violation of these Terms of Service</li>
              <li>Fraudulent or illegal activity</li>
              <li>Extended period of inactivity</li>
              <li>Request for account deletion</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
            <p className="text-grey-soft leading-relaxed">
              ForgeSpace integrates with third-party services (Google OAuth, GitHub OAuth, MongoDB Atlas, Cloudinary, Vercel). Your use of these services is subject to their respective terms and privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
            <p className="text-grey-soft leading-relaxed">
              The ForgeSpace platform, including its original content, features, and functionality, is owned by the project contributors and is protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
            <p className="text-grey-soft leading-relaxed">
              These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
            <p className="text-grey-soft leading-relaxed">
              We reserve the right to modify these terms at any time. Continued use of ForgeSpace after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="text-grey-soft leading-relaxed">
              For questions about these Terms of Service, please contact us through your workspace settings or via GitHub.
            </p>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-grey-border flex justify-between items-center">
          <Link href="/privacy" className="text-grey-muted hover:text-white transition-colors">
            ← Privacy Policy
          </Link>
          <Link href="/license" className="text-grey-muted hover:text-white transition-colors">
            License →
          </Link>
        </div>
      </div>
    </div>
  );
}
