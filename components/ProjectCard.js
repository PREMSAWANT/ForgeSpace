import Link from 'next/link';
import { truncateText, getStatusColor } from '@/utils/helpers';

export default function ProjectCard({ project }) {
  return (
    <Link href={`/project/${project._id}`}>
      <div className="card hover:shadow-card-hover cursor-pointer group">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-semibold group-hover:text-grey-soft transition-colors">
              {project.title}
            </h3>
            <span className={`px-3 py-1 rounded text-xs font-medium ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
          </div>

          {/* Description */}
          {project.description && (
            <p className="text-grey-muted text-sm leading-relaxed">
              {truncateText(project.description, 120)}
            </p>
          )}

          {/* Tech Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0, 4).map((tech, index) => (
                <span
                  key={index}
                  className="tech-badge"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="tech-badge opacity-60">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>
          )}

          {/* File Count */}
          {project.files && project.files.length > 0 && (
            <div className="text-xs text-grey-muted pt-2 border-t border-grey-border">
              {project.files.length} file{project.files.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
