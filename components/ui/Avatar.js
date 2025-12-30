'use client';

import { getInitials } from '@/utils/helpers';

/**
 * Avatar Component - Enterprise Grade
 * Shows user image or initials
 */

export default function Avatar({ 
  user,
  size = 'md',
  className = '' 
}) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
  };
  
  if (user?.image) {
    return (
      <img 
        src={user.image} 
        alt={user.name || 'User'} 
        className={`
          rounded-full 
          border border-grey-border 
          object-cover
          ${sizes[size]} 
          ${className}
        `}
      />
    );
  }
  
  return (
    <div className={`
      rounded-full 
      bg-grey-dark 
      border border-grey-border 
      flex items-center justify-center 
      font-medium text-grey-soft
      ${sizes[size]} 
      ${className}
    `}>
      {getInitials(user?.name || 'U')}
    </div>
  );
}
