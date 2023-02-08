import { EntityId } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom';

import { useGetUsersQuery } from './usersApiSlice';
import { useTitle } from '../../hooks/useTitle';

import { GoBackHeader, Loader, DateTimeInfo } from '../../components';
import { EditUserForm } from './EditUserForm';

export function EditUser() {
  useTitle('Editar Usuário | TechNotes');

  const { id } = useParams();

  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id as EntityId],
    }),
  });

  const content = user ? (
    <section className="h-full w-full pt-4">
      <GoBackHeader path="/dashboard/users">Editar Usuário</GoBackHeader>

      <DateTimeInfo createdAt={user.createdAt} updatedAt={user.updatedAt} />

      <div className="w-full max-w-3xl mx-auto mt-8">
        <EditUserForm user={user} />
      </div>
    </section>
  ) : (
    <Loader />
  );

  return content;
}
