import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { selectAllUsers } from '../users/usersApiSlice';

import { GoBackHeader, Loader } from '../../components';
import { NewNoteForm } from './NewNoteForm';

export function NewNote() {
  const users = useSelector((state: RootState) => selectAllUsers(state));

  const content = users ? (
    <section className="h-full w-full pt-4">
      <GoBackHeader path="/dashboard">Adicionar Nota</GoBackHeader>

      <div className="w-full max-w-3xl mx-auto mt-8">
        <NewNoteForm users={users} />
      </div>
    </section>
  ) : (
    <Loader />
  );

  return content;
}
