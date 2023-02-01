import { ReactNode } from 'react';

import { useGetUsersQuery } from './UsersApiSlice';
import { QueryError } from '../../shared/types';

import { Loader } from '../../components/Loader';
import { ErrorMessage } from '../../components/ErrorMessage';
import { User } from './User';

export function UsersList() {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content: ReactNode;

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
    const { ids } = users;

    const tableContet = ids.map((id) => <User key={id} userId={id} />);

    const thStyles = 'p-4 text-lg font-bold tracking-wide text-left';

    content = (
      <section className="my-6">
        <table className="w-full max-w-5xl mx-auto text-left border-collapse rounded overflow-hidden shadow-sm">
          <thead className="bg-teal-700 text-zinc-100 border-b-2 border-zinc-800 hidden md:table-header-group">
            <tr>
              <th className={thStyles}>Usuário</th>
              <th className={thStyles}>Funções</th>
              <th className={thStyles}>Status</th>
              <th className={thStyles}>Cadastro</th>
              <th className={thStyles}>Editar</th>
            </tr>
          </thead>
          <tbody className="md:divide-y-2 divide-zinc-900">{tableContet}</tbody>
        </table>
      </section>
    );
  } else return null;

  return content;
}
