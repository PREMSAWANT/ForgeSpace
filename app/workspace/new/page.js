'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Card from '@/components/ui/Card';

export default function NewWorkspacePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/workspace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const { workspace } = await res.json();
        router.push(`/workspace/${workspace._id}`);
      } else {
        alert('Failed to create workspace');
      }
    } catch (error) {
      console.error('Error creating workspace:', error);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Link href="/dashboard" className="text-grey-soft hover:text-white transition-colors text-sm mb-4 inline-flex items-center gap-2 group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold mb-3 mt-4">Create New Workspace</h1>
          <p className="text-grey-muted text-lg">
            Set up a secure environment for your team to collaborate on projects
          </p>
        </div>

        {/* Form Card */}
        <Card variant="elevated" hover={false} className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Workspace Name */}
            <Input
              label="Workspace Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Engineering Team"
              helperText="Choose a name that clearly identifies your workspace"
              required
            />

            {/* Description */}
            <Textarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="A collaborative space for our engineering projects and documentation"
              helperText="Help team members understand the purpose of this workspace"
              rows={4}
            />

            {/* Info Box */}
            <div className="bg-grey-dark border border-grey-border rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="text-2xl mt-0.5">ℹ️</div>
                <div>
                  <h3 className="font-semibold text-white mb-1 text-sm">Workspace Permissions</h3>
                  <p className="text-sm text-grey-muted leading-relaxed">
                    As the creator, you'll be the workspace owner. You can invite team members and assign roles (Admin, Member, Viewer) after creation.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.back()}
                className="flex-1"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </div>
                ) : (
                  'Create Workspace'
                )}
              </Button>
            </div>
          </form>
        </Card>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-4 mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          {features.map((feature) => (
            <Card key={feature.title} variant="ghost" className="p-5">
              <div className="text-2xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold mb-2 text-sm">{feature.title}</h3>
              <p className="text-sm text-grey-muted leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: '👥',
    title: 'Team Collaboration',
    description: 'Invite unlimited members with granular role-based permissions',
  },
  {
    icon: '📁',
    title: 'Project Organization',
    description: 'Create and manage multiple projects within your workspace',
  },
  {
    icon: '📊',
    title: 'Activity Tracking',
    description: 'Monitor all workspace activities and team contributions',
  },
];
