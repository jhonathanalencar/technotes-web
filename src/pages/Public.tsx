import { Link } from 'react-router-dom';
import { SignIn } from 'phosphor-react';

export function Public() {
  return (
    <section className="h-full flex flex-col p-4">
      <header className="border-b-2 border-gray-500 py-4 md:py-6">
        <h2 className="text-gray-100 font-semibold text-3xl md:text-4xl">
          Seja bem vindo(a) à JH Reparos!
        </h2>
      </header>

      <main className="flex flex-1 flex-col gap-6 py-4 font-medium md:py-6">
        <p className="text-gray-300 text-xl md:text-2xl">
          A JH Reparos oferece as melhores soluções para atender às suas
          necessidades de reparo técnico!
        </p>

        <address className="text-gray-300 text-lg font-medium md:text-xl">
          JH Reparos <br />
          Rua Lorem Ipsum, 96 <br />
          Cidade Falsa, CF <br />
          (12) 34567-8910 <br />
        </address>

        <span className="text-gray-300 text-lg font-medium md:text-xl">
          Proprietário: Jhon Athan
        </span>
      </main>
      <footer className="border-t-2 border-gray-500 py-4 md:py-6">
        <Link
          to="login"
          className="inline-flex items-center gap-2 text-gray-100 font-semibold text-2xl md:text-3xl hover:text-gray-400 transition-colors duration-200"
        >
          Login <SignIn className="h-8 w-8 md:h-10 md:w-10" />
        </Link>
      </footer>
    </section>
  );
}
