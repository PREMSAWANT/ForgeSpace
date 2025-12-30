'use client';

/**
 * Button Component - Enterprise Grade
 * Variants: primary, secondary, ghost, danger, outline
 * Sizes: sm, md, lg
 */

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  icon = null,
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black';
  
  const variants = {
    primary: 'bg-white text-black hover:bg-grey-soft border border-white',
    secondary: 'bg-grey-dark text-white border border-grey-border hover:border-grey-muted backdrop-blur-sm',
    ghost: 'bg-transparent text-white hover:bg-white/5 border border-transparent hover:border-grey-border',
    danger: 'bg-transparent text-white border border-grey-border hover:bg-white hover:text-black',
    outline: 'bg-transparent text-white border border-white/20 hover:bg-white hover:text-black',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-sm gap-2',
    md: 'px-5 py-2 text-sm rounded-sm gap-2',
    lg: 'px-7 py-2.5 text-base rounded-md gap-3',
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
