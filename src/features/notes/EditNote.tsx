import { useParams } from 'react-router-dom';
import { EntityId } from '@reduxjs/toolkit';

import { useGetNotesQuery } from './notesApiSlice';
import { EditNoteForm } from './EditNoteForm';
import { useGetUsersQuery } from '../users/usersApiSlice';
import { User } from '../../shared/types';
import { useAuth } from '../../hooks/useAuth';
import { useTitle } from '../../hooks/useTitle';

import {
  GoBackHeader,
  Loader,
  DateTimeInfo,
  ErrorMessage,
} from '../../components';

export function EditNote() {
  useTitle('Editar Nota | TechNotes');

  const { id } = useParams();

  const { isAdmin, isManager, username } = useAuth();

  const { note } = useGetNotesQuery('notesList', {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id as EntityId],
    }),
  });
  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids
        .map((id) => data.entities[id])
        .filter((user): user is User => !!user),
    }),
  });

  if (!note || !users?.length) {
    return <Loader />;
  }

  if (!isManager && !isAdmin) {
    if (note.owner !== username) {
      return <ErrorMessage error="Sem acesso" />;
    }
  }

  const content = (
    <section className="w-full h-full pt-4">
      <GoBackHeader path="/dashboard/notes">
        Editar Nota #{note.ticket}
      </GoBackHeader>

      <DateTimeInfo createdAt={note.createdAt} updatedAt={note.updatedAt} />

      <div className="w-full max-w-3xl mx-auto mt-8 pb-16">
        <EditNoteForm note={note} users={users} />
      </div>
    </section>
  );

  return content;
}
