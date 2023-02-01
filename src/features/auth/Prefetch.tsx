import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { store } from '../../redux/store';
import { usersApiSlice } from '../users/usersApiSlice';

export function Prefetch() {
  useEffect(() => {
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

    return () => {
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
}
