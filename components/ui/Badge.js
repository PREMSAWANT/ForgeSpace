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
    success: 'bg-syntax-green/10 text-syntax-green border border-syntax-green/30',
    info: 'bg-syntax-blue/10 text-syntax-blue border border-syntax-blue/30',
    warning: 'bg-syntax-orange/10 text-syntax-orange border border-syntax-orange/30',
    error: 'bg-syntax-red/10 text-syntax-red border border-syntax-red/30',
  };
  
  const sizes = {
    sm: 'px-1.5 py-0.5 text-[10px] uppercase tracking-wider',
    md: 'px-2 py-1 text-xs uppercase tracking-wider',
    lg: 'px-3 py-1.5 text-sm uppercase tracking-wider',
  };
  
  return (
    <span className={`
      inline-flex items-center 
      rounded-sm 
      font-bold mono 
      transition-colors duration-200
      ${variants[variant]} 
      ${sizes[size]} 
      ${className}
    `}>
      {children}
    </span>
  );
}
