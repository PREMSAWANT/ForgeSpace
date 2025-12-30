'use client';

/**
 * Select Component - Enterprise Grade
 */

export default function Select({ 
  label,
  error,
  helperText,
  options = [],
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
      
      <select
        className={`
          w-full px-4 py-3 
          bg-grey-dark text-white 
          border border-grey-border 
          rounded-lg
          transition-all duration-200
          focus:outline-none 
          focus:border-grey-soft 
          focus:bg-grey-dark/80
          focus:ring-2 focus:ring-white/5
          disabled:opacity-50 disabled:cursor-not-allowed
          cursor-pointer
          ${error ? 'border-white/30 focus:border-white/50' : ''}
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            className="bg-grey-dark text-white"
          >
            {option.label}
          </option>
        ))}
      </select>
      
      {(error || helperText) && (
        <p className={`mt-2 text-sm ${error ? 'text-white/80' : 'text-grey-muted'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}
