import { Outlet } from 'react-router-dom';

export function DefaultLayout() {
  return (
    <main className="h-screen bg-home-background bg-right-bottom bg-cover bg-slate-800 bg-blend-multiply">
      <Outlet />
    </main>
  );
}