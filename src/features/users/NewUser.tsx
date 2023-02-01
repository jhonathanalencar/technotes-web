import { GoBackHeader } from '../../components';
import { NewUserForm } from './NewUserForm';

export function NewUser() {
  return (
    <section className="h-full w-full mt-4">
      <GoBackHeader>Cadastro de Usuário</GoBackHeader>

      <div className="w-full max-w-3xl mx-auto mt-8">
        <NewUserForm />
      </div>
    </section>
  );
}
