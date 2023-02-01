import { EntityId } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState } from '../../redux/store';
import { selectUserById } from './usersApiSlice';

import { Loader } from '../../components';

export function EditUser() {
  const { id } = useParams();

  const user = useSelector((state: RootState) =>
    selectUserById(state, id as EntityId)
  );

  const content = user ? (
    <div className="text-gray-100">{user.username}</div>
  ) : (
    <Loader />
  );

  return content;
}
