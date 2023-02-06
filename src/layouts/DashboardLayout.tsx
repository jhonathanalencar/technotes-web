import { Outlet } from 'react-router-dom';

import { DashboardHeader, DashboardFooter } from '../components';

export function DashboardLayout() {
  return (
    <section className="h-full flex flex-col p-4">
      <DashboardHeader />

      <main className="h-full overflow-auto hide-scrollbar">
        <Outlet />
      </main>

      <DashboardFooter />
    </section>
  );
}
