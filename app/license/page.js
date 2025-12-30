import Link from 'next/link';

export default function LicensePage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-sm text-grey-muted hover:text-white transition-colors mono">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-4">MIT License</h1>
          <p className="text-grey-muted">Open Source Software License</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <div className="bg-grey-charcoal border border-grey-border rounded-lg p-8 mono text-sm leading-relaxed">
              <p className="text-grey-soft mb-6">
                Copyright (c) 2025 ForgeSpace Contributors
              </p>
              
              <p className="text-grey-soft mb-6">
                Permission is hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the "Software"), to deal
                in the Software without restriction, including without limitation the rights
                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                copies of the Software, and to permit persons to whom the Software is
                furnished to do so, subject to the following conditions:
              </p>

              <p className="text-grey-soft mb-6">
                The above copyright notice and this permission notice shall be included in all
                copies or substantial portions of the Software.
              </p>

              <p className="text-grey-soft">
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                SOFTWARE.
              </p>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">What This Means</h2>
            <p className="text-grey-soft leading-relaxed mb-4">
              The MIT License is a permissive free software license. In simple terms:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-grey-charcoal border border-grey-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-syntax-green">✓ You Can</h3>
                <ul className="space-y-2 text-grey-soft text-sm">
                  <li>• Use commercially</li>
                  <li>• Modify the code</li>
                  <li>• Distribute copies</li>
                  <li>• Use privately</li>
                  <li>• Sublicense</li>
                </ul>
              </div>

              <div className="bg-grey-charcoal border border-grey-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-syntax-orange">! You Must</h3>
                <ul className="space-y-2 text-grey-soft text-sm">
                  <li>• Include copyright notice</li>
                  <li>• Include license text</li>
                  <li>• State changes made</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Licenses</h2>
            <p className="text-grey-soft leading-relaxed mb-6">
              ForgeSpace uses the following open-source dependencies:
            </p>

            <div className="bg-grey-charcoal border border-grey-border rounded-lg p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-1">Next.js</h3>
                <p className="text-sm text-grey-muted">MIT License - React framework for production</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">React</h3>
                <p className="text-sm text-grey-muted">MIT License - JavaScript library for building user interfaces</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">NextAuth.js</h3>
                <p className="text-sm text-grey-muted">ISC License - Authentication for Next.js</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">MongoDB & Mongoose</h3>
                <p className="text-sm text-grey-muted">Apache 2.0 / MIT - Database and ODM</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Tailwind CSS</h3>
                <p className="text-sm text-grey-muted">MIT License - Utility-first CSS framework</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Cloudinary</h3>
                <p className="text-sm text-grey-muted">MIT License - Cloud-based image and video management</p>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Contributing</h2>
            <p className="text-grey-soft leading-relaxed">
              By contributing to ForgeSpace, you agree that your contributions will be licensed under the MIT License. 
              All contributors retain copyright to their contributions while granting the project the right to distribute 
              under the MIT License.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Questions</h2>
            <p className="text-grey-soft leading-relaxed">
              For questions about licensing, please open an issue on our GitHub repository or contact the maintainers.
            </p>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-grey-border flex justify-between items-center">
          <Link href="/privacy" className="text-grey-muted hover:text-white transition-colors">
            ← Privacy Policy
          </Link>
          <Link href="/terms" className="text-grey-muted hover:text-white transition-colors">
            ← Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
}
