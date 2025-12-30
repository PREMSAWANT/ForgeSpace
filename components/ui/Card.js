'use client';

/**
 * Card Component - Enterprise Grade
 * Base card with variants for different use cases
 */

export default function Card({ 
  children, 
  variant = 'default',
  hover = true,
  className = '',
  ...props 
}) {
  const variants = {
    default: 'bg-grey-dark/40 border-white/5',
    elevated: 'bg-grey-dark/60 border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.3)]',
    outline: 'bg-transparent border-grey-border',
    ghost: 'bg-transparent border-transparent hover:border-grey-border',
  };
  
  const hoverStyles = hover 
    ? 'hover:bg-grey-dark/60 hover:border-white/10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:-translate-y-0.5' 
    : '';
  
  return (
    <div 
      className={`
        backdrop-blur-xl
        border 
        rounded-2xl 
        p-6
        transition-all duration-300
        ${variants[variant]}
        ${hoverStyles}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
