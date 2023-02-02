import { Outlet, Link } from 'react-router-dom';

export function DashboardLayout() {
  return (
    <section className="h-full flex flex-col p-4">
      <header className="text-gray-100 text-3xl font-bold md:text-4xl border-b-2 border-gray-500 py-4 md:py-6">
        <Link
          to="/dashboard"
          className=" rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-4 focus:ring-offset-zinc-900"
        >
          techNotes
        </Link>
      </header>
      <main className="h-full overflow-auto hide-scrollbar">
        <Outlet />
      </main>
      <footer className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-6 border-t-2 border-gray-500 py-4 md:py-6">
        <span className="text-gray-300 text-lg font-medium md:text-xl">
          Usuário Atual:{' '}
          <span className="text-gray-100 font-semibold">Anna</span>
        </span>
        <span className="text-gray-300 text-lg font-medium md:text-xl">
          Status: <span className="text-gray-100 font-semibold">Ativo</span>
        </span>
      </footer>
    </section>
  );
}
