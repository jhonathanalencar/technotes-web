import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Login, Welcome } from './features/auth';
import { Prefetch } from './features/auth/Prefetch';
import { NewNote, NotesList } from './features/notes';
import { EditUser, NewUser, UsersList } from './features/users';
import { DashboardLayout, DefaultLayout } from './layouts';
import { NotFound, Public } from './pages';

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
        element: <Prefetch />,
        children: [
          {
            path: 'dashboard',
            element: <DashboardLayout />,
            children: [
              {
                index: true,
                element: <Welcome />,
              },
              {
                path: 'users',
                children: [
                  {
                    index: true,
                    element: <UsersList />,
                  },
                  {
                    path: ':id',
                    element: <EditUser />,
                  },
                  {
                    path: 'new',
                    element: <NewUser />,
                  },
                ],
              },
              {
                path: 'notes',
                children: [
                  {
                    index: true,
                    element: <NotesList />,
                  },
                  {
                    path: 'new',
                    element: <NewNote />,
                  },
                ],
              },
            ],
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
