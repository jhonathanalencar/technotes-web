import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { selectAllUsers } from '../users/usersApiSlice';
import { NewNoteForm } from './NewNoteForm';

import { ErrorMessage, GoBackHeader } from '../../components';

export function NewNote() {
  const users = useSelector((state: RootState) => selectAllUsers(state));

  if (!(users?.length > 0)) {
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
