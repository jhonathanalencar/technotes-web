import { GoBackHeader } from '../../components';
import { useTitle } from '../../hooks/useTitle';
import { LoginForm } from './LoginForm';

export function Login() {
  useTitle('Login | JH Reparos');

  return (
    <section className="h-full flex flex-col p-4">
      <header className="border-b-2 border-gray-500 py-4 md:py-6">
        <GoBackHeader path="/">Login do funcionário</GoBackHeader>
      </header>

      <main className="flex flex-1 flex-col gap-6 w-full max-w-3xl mx-auto py-4 font-medium md:py-6">
        <LoginForm />
      </main>
    </section>
  );
}
