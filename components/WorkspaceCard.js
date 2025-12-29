import Link from 'next/link';
import { getInitials } from '@/utils/helpers';

export default function WorkspaceCard({ workspace, projectCount = 0 }) {
  const memberCount = workspace.members?.length || 0;

  return (
    <Link href={`/workspace/${workspace._id}`}>
      <div className="card hover:shadow-card-hover cursor-pointer group">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-semibold group-hover:text-grey-soft transition-colors">
              {workspace.name}
            </h3>
            
            {/* Owner Badge */}
            {workspace.ownerId && typeof workspace.ownerId === 'object' && (
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-semibold text-xs">
                {getInitials(workspace.ownerId.name)}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex gap-6 text-sm">
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{projectCount}</span>
              <span className="text-muted">Project{projectCount !== 1 ? 's' : ''}</span>
            </div>
            
            <div className="border-l border-grey-mid"></div>
            
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{memberCount}</span>
              <span className="text-muted">Member{memberCount !== 1 ? 's' : ''}</span>
            </div>
          </div>

          {/* Members Preview */}
          {workspace.members && workspace.members.length > 0 && (
            <div className="flex -space-x-2 pt-2">
              {workspace.members.slice(0, 5).map((member, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full bg-grey-mid text-white flex items-center justify-center text-xs font-medium border-2 border-grey-charcoal"
                  title={member.userId?.name || 'Member'}
                >
                  {getInitials(member.userId?.name || 'M')}
                </div>
              ))}
              {workspace.members.length > 5 && (
                <div className="w-8 h-8 rounded-full bg-grey-mid text-grey-muted flex items-center justify-center text-xs font-medium border-2 border-grey-charcoal">
                  +{workspace.members.length - 5}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
