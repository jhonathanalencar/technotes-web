import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className={`min-w-[132px] text-gray-100 py-3 px-6 text-lg font-bold rounded tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed bg-green-500 hover:bg-green-600 focus:bg-green-600 disabled:bg-green-500`}
      {...rest}
    >
      {children}
    </button>
  );
}
