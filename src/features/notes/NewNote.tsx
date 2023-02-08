import { useGetUsersQuery } from '../users/usersApiSlice';
import { NewNoteForm } from './NewNoteForm';
import { User } from '../../shared/types';
import { useTitle } from '../../hooks/useTitle';

import { ErrorMessage, GoBackHeader } from '../../components';

export function NewNote() {
  useTitle('Adicionar Nota | TechNotes');

  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids
        .map((id) => data.entities[id])
        .filter((user): user is User => !!user),
    }),
  });

  if (!users || !users?.length) {
    return <ErrorMessage error="Esta página não está disponível no momento" />;
  }

  return (
    <section className="h-full w-full pt-4">
      <GoBackHeader path="/dashboard">Adicionar Nota</GoBackHeader>

      <div className="w-full max-w-3xl mx-auto mt-8">
        <NewNoteForm users={users} />
      </div>
    </section>
  );
}
