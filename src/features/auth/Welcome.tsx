import { dateFormatter } from '../../utils/formatter';
import { DashboardLink } from '../../components/DashboardLink';

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
        <DashboardLink linkTo="/dashboard/notes">
          Ver notas técnicas
        </DashboardLink>

        <DashboardLink linkTo="/dashboard/users">
          Ver Configurações de Usuários
        </DashboardLink>

        <DashboardLink linkTo="/dashboard/users/new">
          Adicionar novo usuário
        </DashboardLink>
      </div>
    </section>
  );
}
