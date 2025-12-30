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
    primary: 'bg-white text-black hover:bg-grey-soft border border-white shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]',
    secondary: 'bg-grey-dark text-white border border-grey-border hover:bg-grey-dark hover:border-grey-soft backdrop-blur-sm',
    ghost: 'bg-transparent text-white hover:bg-white/5 border border-transparent hover:border-grey-border',
    danger: 'bg-transparent text-white border border-grey-border hover:bg-white hover:text-black',
    outline: 'bg-transparent text-white border border-white/20 hover:bg-white hover:text-black',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg gap-2',
    md: 'px-6 py-2.5 text-base rounded-full gap-2',
    lg: 'px-8 py-3 text-lg rounded-full gap-3',
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
