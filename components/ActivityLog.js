import { formatDistanceToNow } from '@/utils/helpers';
import Avatar from './ui/Avatar';
import Card from './ui/Card';

export default function ActivityLog({ activities = [] }) {
  if (!activities || activities.length === 0) {
    return (
      <Card variant="ghost" className="py-12 text-center">
        <div className="w-12 h-12 rounded-full bg-grey-dark border border-grey-border flex items-center justify-center mx-auto mb-4">
          <span className="text-xl opacity-50">◐</span>
        </div>
        <p className="text-grey-muted">No recent activity</p>
      </Card>
    );
  }

  return (
    <Card variant="default" className="p-0 overflow-hidden">
      <div className="divide-y divide-grey-border">
        {activities.map((activity, index) => (
          <div 
            key={index} 
            className="p-6 hover:bg-grey-dark/30 transition-colors duration-200 group"
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <Avatar user={activity.user} size="md" />

              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-medium text-white">
                    {activity.user?.name || 'Unknown User'}
                  </span>
                  <span className="text-grey-muted text-sm">
                    {activity.action}
                  </span>
                  {activity.target && (
                    <span className="font-mono text-sm text-grey-soft bg-grey-dark px-2 py-0.5 rounded border border-grey-border">
                      {activity.target}
                    </span>
                  )}
                </div>
                <time className="text-xs text-grey-muted">
                  {formatDistanceToNow(activity.createdAt)}
                </time>
              </div>

              {/* Subtle indicator */}
              <div className="w-2 h-2 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
