'use client';

/**
 * Badge Component - Enterprise Grade
 * For statuses, tags, labels
 */

export default function Badge({ 
  children, 
  variant = 'default',
  size = 'md',
  className = '' 
}) {
  const variants = {
    default: 'bg-grey-dark text-grey-soft border border-grey-border',
    primary: 'bg-white text-black border border-white',
    secondary: 'bg-grey-charcoal text-white border border-grey-border',
    outline: 'bg-transparent text-white border border-grey-border',
    success: 'bg-grey-dark text-white border border-grey-soft',
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };
  
  return (
    <span className={`
      inline-flex items-center 
      rounded-full 
      font-medium mono 
      transition-colors duration-200
      ${variants[variant]} 
      ${sizes[size]} 
      ${className}
    `}>
      {children}
    </span>
  );
}
