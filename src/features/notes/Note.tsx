import { memo } from 'react';
import { EntityId } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { NotePencil } from 'phosphor-react';

import { useGetNotesQuery } from './notesApiSlice';

interface NoteProps {
  noteId: EntityId;
}

function NoteComponent({ noteId }: NoteProps) {
  const { note } = useGetNotesQuery('notesList', {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteId],
    }),
  });

  const navigate = useNavigate();

  if (!note) return null;

  function handleEdit() {
    navigate(`/dashboard/notes/${noteId}`);
  }

  const isCompleted = note.completed;

  const trStyles =
    'w-full bg-zinc-700 text-zinc-200 font-medium text-base xsm:text-lg even:bg-zinc-800 ';
  const tdStyles = 'p-2 md:p-4 text-left leading-tight';

  return (
    <tr className={trStyles}>
      <td
        data-label="Status"
        className={`${tdStyles} ${
          isCompleted ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {isCompleted ? 'Completada' : 'Aberta'}
      </td>
      <td data-label="Criação" className={`${tdStyles} hidden lg:table-cell`}>
        {new Date(note.createdAt).toLocaleDateString()}
      </td>
      <td
        data-label="Atualização"
        className={`${tdStyles} hidden lg:table-cell`}
      >
        {new Date(note.updatedAt).toLocaleDateString()}
      </td>
      <td data-label="Título" className={tdStyles}>
        <span className="line-wrap break-all xsm:break-normal">
          {note.title}
        </span>
      </td>
      <td
        data-label="Proprietário"
        className={`${tdStyles} hidden lg:table-cell`}
      >
        {note.owner}
      </td>
      <td data-label="Editar" className={tdStyles}>
        <div className="flex items-center justify-center">
          <button
            className="inline-flex items-center justify-center hover:text-green-500 focus:outline-none focus:text-green-500 focus:ring-2 focus:ring-blue-600 focus:ring-offset-1 focus:ring-offset-zinc-900 rounded"
            type="button"
            onClick={handleEdit}
          >
            <NotePencil className="h-6 w-6 md:h-7 md:w-7" weight="fill" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export const Note = memo(NoteComponent);
