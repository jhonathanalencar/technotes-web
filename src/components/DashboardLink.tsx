import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'phosphor-react';

interface DashboardLinkProps {
  linkTo: string;
  children: ReactNode;
}

export function DashboardLink({ linkTo, children }: DashboardLinkProps) {
  return (
    <Link
      to={linkTo}
      className="flex items-center gap-2 text-gray-300 text-lg md:text-xl hover:text-blue-600 focus:outline-none focus:text-blue-600 focus:underline focus:underline-offset-2"
    >
      <ArrowRight className="text-green-500" weight="bold" />
      {children}
    </Link>
  );
}
