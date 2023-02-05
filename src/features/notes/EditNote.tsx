import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState } from '../../redux/store';
import { selectNoteById } from './notesApiSlice';

import { GoBackHeader, Loader } from '../../components';
import { EntityId } from '@reduxjs/toolkit';
import { EditNoteForm } from './EditNoteForm';
import { DateTimeInfo } from '../../components';
import { selectAllUsers } from '../users/usersApiSlice';

export function EditNote() {
  const { id } = useParams();

  const note = useSelector((state: RootState) =>
    selectNoteById(state, id as EntityId)
  );
  const users = useSelector((state: RootState) => selectAllUsers(state));

  const content =
    note && users ? (
      <section className="w-full h-full pt-4">
        <GoBackHeader path="/dashboard/notes">
          Editar Nota #{note.ticket}
        </GoBackHeader>

        <DateTimeInfo createdAt={note.createdAt} updatedAt={note.updatedAt} />

        <div className="w-full max-w-3xl mx-auto mt-8 pb-16">
          <EditNoteForm note={note} users={users} />
        </div>
      </section>
    ) : (
      <Loader />
    );

  return content;
}
