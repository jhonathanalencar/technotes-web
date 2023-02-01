import { Outlet } from 'react-router-dom';

import { store } from '../../redux/store';
import { usersApiSlice } from '../users/usersApiSlice';

export function Prefetch() {
  store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

  return <Outlet />;
}
