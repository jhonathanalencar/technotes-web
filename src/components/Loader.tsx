import { CircleNotch } from 'phosphor-react';

interface LoaderProps {
  message?: string;
  isSmall?: boolean;
}

export function Loader({
  message = 'Carregando...',
  isSmall = false,
}: LoaderProps) {
  return (
    <div className="flex items-center justify-center gap-4 text-gray-200">
      <CircleNotch
        className="h-6 w-6 md:h-8 md:w-8 animate-spin"
        weight="bold"
      />

      {!isSmall ? (
        <p className="text-xl md:text-2xl animate-pulse">{message}</p>
      ) : null}
    </div>
  );
}
