import React from 'react';

export default function Card({
  children,
  className = '',
  hover = false,
  padding = 'md',
  ...props
}) {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const baseStyles = 'bg-white rounded-2xl border border-slate-100 shadow-lg';
  const hoverStyles = hover ? 'hover:shadow-xl hover:-translate-y-2 transition-all duration-300' : '';

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
