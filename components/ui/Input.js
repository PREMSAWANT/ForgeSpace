'use client';

/**
 * Input Component - Enterprise Grade  
 * Clean, minimal text input with labels and error states
 */

export default function Input({ 
  label,
  error,
  helperText,
  icon,
  className = '',
  ...props 
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-grey-soft mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-grey-muted">
            {icon}
          </div>
        )}
        
        <input
          className={`
            w-full px-4 py-3 
            ${icon ? 'pl-12' : ''}
            bg-grey-dark text-white 
            border border-grey-border 
            rounded-lg
            placeholder:text-grey-muted
            transition-all duration-200
            focus:outline-none 
            focus:border-grey-soft 
            focus:bg-grey-dark/80
            focus:ring-2 focus:ring-white/5
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-white/30 focus:border-white/50' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      
      {(error || helperText) && (
        <p className={`mt-2 text-sm ${error ? 'text-white/80' : 'text-grey-muted'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}
