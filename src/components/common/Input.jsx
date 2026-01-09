import React, { forwardRef } from 'react';

const Input = forwardRef(function Input(
  {
    label,
    error,
    icon: Icon,
    className = '',
    containerClassName = '',
    ...props
  },
  ref
) {
  return (
    <div className={`space-y-1.5 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-xl border border-slate-200 
            bg-white text-slate-700 placeholder-slate-400
            focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500
            transition-all duration-200
            disabled:bg-slate-50 disabled:cursor-not-allowed
            ${Icon ? 'pl-12' : ''}
            ${error ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

export default Input;
