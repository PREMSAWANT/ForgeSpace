import { formatDate, getInitials } from '@/utils/helpers';

export default function ActivityLog({ activities }) {
  if (!activities || activities.length === 0) {
    return (
      <div className="card text-center text-muted py-12">
        No activity yet
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {activities.map((activity, index) => (
        <div key={index} className="card">
          <div className="flex items-start gap-4">
            {/* User Avatar */}
            <div className="w-10 h-10 rounded-full bg-grey-mid text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
              {getInitials(activity.userId?.name || 'User')}
            </div>

            {/* Activity Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-medium">
                  {activity.userId?.name || 'Unknown User'}
                </span>
                <span className="text-secondary">
                  {activity.action}
                </span>
              </div>
              
              <div className="text-xs text-muted mt-1">
                {formatDate(activity.timestamp)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
