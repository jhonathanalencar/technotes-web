import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Login } from './features/auth/Login';
import { Welcome } from './features/auth/Welcome';
import { NotesList } from './features/notes/NotesList';
import { UsersList } from './features/users/UsersList';
import { DashboardLayout } from './layouts/DashboardLayout';
import { DefaultLayout } from './layouts/DefaultLayout';
import { NotFound } from './pages/NotFound';
import { Public } from './pages/Public';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Public />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Welcome />,
          },
          {
            path: 'notes',
            element: <NotesList />,
          },
          {
            path: 'users',
            element: <UsersList />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
