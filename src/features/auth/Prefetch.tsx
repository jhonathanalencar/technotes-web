import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { store } from '../../redux/store';
import { notesApiSlice } from '../notes/notesApiSlice';
import { usersApiSlice } from '../users/usersApiSlice';

export function Prefetch() {
  useEffect(() => {
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());

    return () => {
      users.unsubscribe();
      notes.unsubscribe();
    };
  }, []);

  return <Outlet />;
}
