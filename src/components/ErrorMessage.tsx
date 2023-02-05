import { Link } from 'react-router-dom';

interface ErrorMessageProps {
  error?: string;
  link?: string;
}

export function ErrorMessage({
  error = 'Algo deu errado e não foi possível realizar a operação. Tente novamente mais tarde.',
  link = '/dashboard',
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col gap-8 items-start">
      <p className="text-red-400 text-xl md:text-2xl">{error}</p>
      <Link
        to={link}
        className="bg-teal-600 text-gray-100 font-semibold text-lg uppercase py-2 px-4 md:px-6 rounded hover:bg-teal-700 focus:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-colors duration-200"
      >
        Voltar
      </Link>
    </div>
  );
}
