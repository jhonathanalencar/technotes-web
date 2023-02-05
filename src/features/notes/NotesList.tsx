import { ReactNode } from 'react';

import { QueryError } from '../../shared/types';
import { Note } from './Note';
import { useGetNotesQuery } from './notesApiSlice';

import { ErrorMessage, GoBackHeader, Loader } from '../../components';

export function NotesList() {
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content: ReactNode = null;

  if (isLoading) {
    content = (
      <section className="mt-4">
        <Loader />
      </section>
    );
  }

  if (isError) {
    content = (
      <section className="mt-4">
        <ErrorMessage error={(error as QueryError)?.data?.error} />
      </section>
    );
  }

  if (isSuccess) {
    const { ids } = notes;

    const tableContent = ids.length
      ? ids.map((id) => <Note key={id} noteId={id} />)
      : null;

    const thStyles = 'p-2 md:p-4 text-lg font-bold tracking-wide text-left';

    content = (
      <section className="mt-4">
        <GoBackHeader path="/dashboard">Notas</GoBackHeader>

        <table className="w-full max-w-6xl mx-auto mt-8 text-left border-collapse rounded overflow-hidden shadow-sm">
          <thead className="bg-teal-700 text-zinc-100 border-b-2 border-zinc-800">
            <tr>
              <th className={thStyles}>Status</th>
              <th className={`${thStyles} hidden lg:table-cell`}>Criação</th>
              <th className={`${thStyles} hidden lg:table-cell`}>
                Atualização
              </th>
              <th className={`${thStyles} w-full`}>Título</th>
              <th className={`${thStyles} hidden lg:table-cell`}>
                Proprietário
              </th>
              <th className={thStyles}>Editar</th>
            </tr>
          </thead>
          <tbody className="md:divide-y-2 divide-zinc-900">
            {tableContent}
          </tbody>
        </table>
      </section>
    );
  }

  return content;
}
