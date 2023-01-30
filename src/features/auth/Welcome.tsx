import { Link } from 'react-router-dom';
import { ArrowRight } from 'phosphor-react';
import { dateFormatter } from '../../utils/formatter';

export function Welcome() {
  return (
    <section className="py-4 flex items-start flex-col gap-6">
      <time className="text-gray-200 text-lg font-medium md:text-xl">
        {dateFormatter.format(new Date())}
      </time>

      <h2 className="text-gray-200 font-medium text-2xl md:text-3xl">
        Bem vindo(a)!
      </h2>

      <div className="flex flex-col items-start gap-4">
        <Link
          to="/dashboard/notes"
          className="flex items-center gap-2 text-gray-300 text-lg md:text-xl hover:text-blue-600 focus:outline-none focus:text-blue-600 focus:underline focus:underline-offset-2"
        >
          <ArrowRight className="text-green-500" weight="bold" />
          Ver notas técnicas
        </Link>
        <Link
          to="/dashboard/users"
          className="flex items-center gap-2 text-gray-300 text-lg md:text-xl hover:text-blue-600 focus:outline-none focus:text-blue-600 focus:underline focus:underline-offset-2"
        >
          <ArrowRight className="text-green-500" weight="bold" /> Ver
          Configurações de Usuários
        </Link>
      </div>
    </section>
  );
}
