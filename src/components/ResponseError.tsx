import { ReactNode } from 'react';

interface ResponseErrorProps {
  children: ReactNode;
}

export function ResponseError({ children }: ResponseErrorProps) {
  return (
    <p
      role="alert"
      className="text-red-500 font-medium text-base tracking-wide md:text-lg"
    >
      {children}
    </p>
  );
}
