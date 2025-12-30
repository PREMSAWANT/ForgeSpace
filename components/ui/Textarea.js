'use client';

/**
 * Textarea Component - Enterprise Grade  
 */

export default function Textarea({ 
  label,
  error,
  helperText,
  className = '',
  rows = 4,
  ...props 
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-grey-soft mb-2">
          {label}
        </label>
      )}
      
      <textarea
        rows={rows}
        className={`
          w-full px-4 py-3 
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
          resize-none
          ${error ? 'border-white/30 focus:border-white/50' : ''}
          ${className}
        `}
        {...props}
      />
      
      {(error || helperText) && (
        <p className={`mt-2 text-sm ${error ? 'text-white/80' : 'text-grey-muted'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}
