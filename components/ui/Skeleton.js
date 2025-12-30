'use client';

/**
 * Loading Skeleton Component
 * Shows placeholder while content is loading
 */

export default function Skeleton({ 
  className = '',
  variant = 'default',
}) {
  const variants = {
    default: 'h-4 w-full',
    text: 'h-4 w-3/4',
    title: 'h-8 w-1/2',
    avatar: 'h-10 w-10 rounded-full',
    card: 'h-32 w-full rounded-2xl',
  };
  
  return (
    <div 
      className={`
        bg-grey-dark 
        animate-pulse 
        rounded
        ${variants[variant]} 
        ${className}
      `}
    />
  );
}

/**
 * Card Skeleton - for loading cards
 */
export function CardSkeleton() {
  return (
    <div className="card space-y-4">
      <div className="flex items-start justify-between">
        <Skeleton variant="title" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <Skeleton variant="text" />
      <Skeleton variant="text" className="w-1/2" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded" />
        <Skeleton className="h-6 w-16 rounded" />
        <Skeleton className="h-6 w-16 rounded" />
      </div>
    </div>
  );
}
