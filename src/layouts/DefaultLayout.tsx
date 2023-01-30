import { Outlet } from 'react-router-dom';

export function DefaultLayout() {
  return (
    <main className="h-screen overflow-auto bg-tech-background bg-right-bottom bg-cover bg-zinc-900 bg-blend-multiply">
      <Outlet />
    </main>
  );
}
