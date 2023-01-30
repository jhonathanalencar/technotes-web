import { CircleNotch } from 'phosphor-react';

interface LoaderProps {
  message?: string;
}

export function Loader({ message = 'Carregando...' }: LoaderProps) {
  return (
    <div className="flex items-center gap-4 text-gray-200">
      <CircleNotch
        className="h-6 w-6 md:h-8 md:w-8 animate-spin"
        weight="bold"
      />
      <p className="text-xl md:text-2xl animate-pulse">{message}</p>
    </div>
  );
}
