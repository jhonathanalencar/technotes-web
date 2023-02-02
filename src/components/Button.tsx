import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: string;
}

export function Button({ children, variant = 'green', ...rest }: ButtonProps) {
  const colorClasses = `bg-${variant}-500 hover:bg-${variant}-600 focus:bg-${variant}-600 disabled:bg-${variant}-500`;

  return (
    <button
      type="button"
      className={`min-w-[132px] text-gray-100 py-3 px-6 text-lg font-bold rounded tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed ${colorClasses}`}
      {...rest}
    >
      {children}
    </button>
  );
}
