import { ArrowLeft } from 'phosphor-react';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface GoBackHeaderProps {
  path: string;
  children: ReactNode;
}

export function GoBackHeader({ children, path }: GoBackHeaderProps) {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(path);
  }

  return (
    <div className="flex items-center gap-2 sticky top-0 z-10 backdrop-blur-sm">
      <button
        type="button"
        onClick={handleGoBack}
        className="text-green-500 inline-flex items-center justify-center hover:text-green-600 focus:text-green-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-colors duration-200 rounded"
      >
        <ArrowLeft className="h-8 w-8" weight="bold" />
      </button>

      <h1 className="text-gray-100 font-bold text-2xl">{children}</h1>
    </div>
  );
}
