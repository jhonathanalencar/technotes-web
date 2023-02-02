import { EntityId } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState } from '../../redux/store';
import { selectUserById } from './usersApiSlice';

import { GoBackHeader, Loader } from '../../components';
import { EditUserForm } from './EditUserForm';

export function EditUser() {
  const { id } = useParams();

  const user = useSelector((state: RootState) =>
    selectUserById(state, id as EntityId)
  );

  function formatDateTime(date: Date) {
    return Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'medium',
    }).format(new Date(date));
  }

  const content = user ? (
    <section className="h-full w-full mt-4">
      <GoBackHeader>Editar Usuário</GoBackHeader>

      <div className="flex flex-col items-start gap-2 my-6">
        <time className="text-gray-300 text-base md:text-lg font-medium">
          Criado em {formatDateTime(user.createdAt)}
        </time>
        <time className="text-gray-300 text-base md:text-lg font-medium">
          Última atualização em {formatDateTime(user.updatedAt)}
        </time>
      </div>

      <div className="w-full max-w-3xl mx-auto mt-8">
        <EditUserForm user={user} />
      </div>
    </section>
  ) : (
    <Loader />
  );

  return content;
}
