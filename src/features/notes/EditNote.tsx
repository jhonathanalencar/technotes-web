import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState } from '../../redux/store';
import { selectNoteById } from './notesApiSlice';

import { GoBackHeader, Loader } from '../../components';
import { EntityId } from '@reduxjs/toolkit';

export function EditNote() {
  const { id } = useParams();

  const note = useSelector((state: RootState) =>
    selectNoteById(state, id as EntityId)
  );

  const content = note ? (
    <section className="w-full h-full mt-4">
      <GoBackHeader>Editar Nota </GoBackHeader>
    </section>
  ) : (
    <Loader />
  );

  return content;
}
