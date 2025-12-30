'use client';

/**
 * EmptyState Component - Enterprise Grade
 * Shows when no data is available
 */

export default function EmptyState({ 
  icon = '◆',
  title,
  description,
  action,
  className = '' 
}) {
  return (
    <div className={`
      flex flex-col items-center justify-center 
      text-center 
      py-16 px-6
      ${className}
    `}>
      <div className="
        w-16 h-16 
        rounded-full 
        bg-grey-dark 
        border border-grey-border
        flex items-center justify-center 
        mb-6
        transition-transform duration-300
        hover:scale-110
      ">
        <span className="text-3xl opacity-50">{icon}</span>
      </div>
      
      {title && (
        <h3 className="text-xl font-semibold mb-2 text-white">
          {title}
        </h3>
      )}
      
      {description && (
        <p className="text-grey-muted mb-8 max-w-md">
          {description}
        </p>
      )}
      
      {action && <div>{action}</div>}
    </div>
  );
}
