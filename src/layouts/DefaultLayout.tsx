import { Outlet } from 'react-router-dom';

export function DefaultLayout() {
  return (
    <main className="h-screen bg-slate-900">
      <Outlet />
    </main>
  );
}
