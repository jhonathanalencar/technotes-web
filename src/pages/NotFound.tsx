import { useNavigate } from 'react-router-dom';
import { SmileySad } from 'phosphor-react';

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
      <button
        type="button"
        onClick={() => navigate('/')}
        className="mt-6 bg-green-500 text-gray-200 py-2 px-4 rounded text-lg font-semibold hover:bg-green-600 focus:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ring-offset-zinc-900"
      >
        Ir para a página inicial
      </button>
    </section>
  );
}
