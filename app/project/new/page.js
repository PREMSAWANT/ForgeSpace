'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';

export default function NewProjectPage({ searchParams }) {
  const router = useRouter();
  const workspaceId = searchParams?.workspace;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    workspaceId: workspaceId || '',
    status: 'active',
    techStack: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const techStackArray = formData.techStack
        .split(',')
        .map(tech => tech.trim())
        .filter(tech => tech);

      const res = await fetch('/api/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          techStack: techStackArray,
        }),
      });

      if (res.ok) {
        const { project } = await res.json();
        router.push(`/project/${project._id}`);
      } else {
        alert('Failed to create project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const statusOptions = [
    { value: 'active', label: '🟢 Active' },
    { value: 'planning', label: '📋 Planning' },
    { value: 'paused', label: '⏸️ Paused' },
    { value: 'completed', label: '✅ Completed' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Link href="/dashboard" className="text-grey-soft hover:text-white transition-colors text-sm mb-4 inline-flex items-center gap-2 group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold mb-3 mt-4">Create New Project</h1>
          <p className="text-grey-muted text-lg">
            Start a new project within your workspace
          </p>
        </div>

        {/* Form Card */}
        <Card variant="elevated" hover={false} className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Title */}
            <Input
              label="Project Title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Mobile App Redesign"
              required
            />

            {/* Workspace Selection */}
            <Input
              label="Workspace ID"
              name="workspaceId"
              type="text"
              value={formData.workspaceId}
              onChange={handleChange}
              placeholder="Enter workspace ID"
              helperText="Enter the workspace ID where this project belongs"
              className="mono text-sm"
              required
            />

            {/* Description */}
            <Textarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="A complete redesign of our mobile application focusing on improved UX and performance"
              rows={4}
            />

            {/* Tech Stack */}
            <Input
              label="Tech Stack"
              name="techStack"
              type="text"
              value={formData.techStack}
              onChange={handleChange}
              placeholder="React Native, TypeScript, Node.js, MongoDB"
              helperText="Separate technologies with commas"
              className="mono text-sm"
            />

            {/* Status */}
            <Select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={statusOptions}
            />

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
                  'Create Project'
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
