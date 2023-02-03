import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState } from '../../redux/store';
import { selectNoteById } from './notesApiSlice';

import { GoBackHeader, Loader } from '../../components';
import { EntityId } from '@reduxjs/toolkit';
import { EditNoteForm } from './EditNoteForm';
import { DateTimeInfo } from '../../components';

export function EditNote() {
  const { id } = useParams();

  const note = useSelector((state: RootState) =>
    selectNoteById(state, id as EntityId)
  );

  const content = note ? (
    <section className="w-full h-full mt-4">
      <GoBackHeader>Editar Nota #{note.ticket}</GoBackHeader>

      <DateTimeInfo createdAt={note.createdAt} updatedAt={note.updatedAt} />

      <div className="w-full max-w-3xl mx-auto mt-8">
        <EditNoteForm />
      </div>
    </section>
  ) : (
    <Loader />
  );

  return content;
}
