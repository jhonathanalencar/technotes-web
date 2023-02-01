import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className="text-gray-100 bg-green-500 py-3 px-6 text-lg font-bold rounded tracking-wide hover:bg-green-600 focus:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-colors duration-200"
      {...rest}
    >
      {children}
    </button>
  );
}
