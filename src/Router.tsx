import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Login, Welcome } from './features/auth';
import { PersistLogin } from './features/auth/PersistLogin';
import { Prefetch } from './features/auth/Prefetch';
import { RequireAuth } from './features/auth/RequireAuth';
import { EditNote, NewNote, NotesList } from './features/notes';
import { EditUser, NewUser, UsersList } from './features/users';
import { DashboardLayout, DefaultLayout } from './layouts';
import { NotFound, Public } from './pages';
import { ROLES } from './shared/data';

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
        element: <PersistLogin />,
        children: [
          {
            element: <RequireAuth allowedRoles={[...Object.values(ROLES)]} />,
            children: [
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
                        element: (
                          <RequireAuth
                            allowedRoles={[ROLES.Manager, ROLES.Admin]}
                          />
                        ),
                        children: [
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
                            path: ':id',
                            element: <EditNote />,
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
