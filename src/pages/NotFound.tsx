import { useNavigate } from 'react-router-dom';
import { SmileySad } from 'phosphor-react';
import { Button } from '../components';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center gap-4 p-4">
      <div className="flex items-center gap-2 mt-8">
        <span className="text-blue-700 text-7xl font-bold">404</span>
        <SmileySad className="h-14 w-14 text-red-400" />
      </div>
      <h1 className="mt-6 text-gray-200 text-2xl md:text-3xl text-center font-bold tracking-wide leading-tight">
        Página não encontrada
      </h1>
      <p className="text-gray-300 text-xl text-center font-medium tracking-wide">
        Desculpe, não foi possível encontrar a página solicitada.
      </p>
      <Button onClick={() => navigate('/')}>Ir para a página inicial</Button>
    </section>
  );
}
