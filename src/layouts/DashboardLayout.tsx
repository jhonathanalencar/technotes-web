import { Outlet } from 'react-router-dom';

import { DashboardHeader } from '../components';

export function DashboardLayout() {
  return (
    <section className="h-full flex flex-col p-4">
      <DashboardHeader />

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
