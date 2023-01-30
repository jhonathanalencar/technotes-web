import { EntityId } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { NotePencil } from 'phosphor-react';

import { RootState } from '../../redux/store';
import { selectUserById } from './UsersApiSlice';
import { useNavigate } from 'react-router-dom';

interface UserProps {
  userId: EntityId;
}

export function User({ userId }: UserProps) {
  const user = useSelector((state: RootState) => selectUserById(state, userId));
  const navigate = useNavigate();

  if (!user) return null;

  function handleEdit() {
    navigate(`/dashboard/users/${userId}`);
  }

  const rolesParsed = user.roles.toString().replaceAll(',', ', ');
  const isActive = user.active;

  const tdStyles =
    'px-4 py-1 md:p-4 w-full block md:table-cell relative md:text-left before:absolute before:content-[attr(data-label)] before:left-4 before:w-1/2 before:text-left md:before:hidden md:w-auto even:bg-zinc-800 md:even:bg-transparent before:text-teal-500 before:font-bold';

  return (
    <tr
      data-active={isActive}
      className="bg-zinc-700 text-zinc-200 font-medium text-lg md:even:bg-zinc-800 block w-full text-right md:w-auto md:table-row rounded mb-2 md:mb-0 data-[active=false]:opacity-50"
    >
      <td data-label="Usuário" className={tdStyles}>
        {user.username}
      </td>

      <td data-label="Funções" className={tdStyles}>
        <span className="w-8/12 ml-auto block md:flex md:w-full md:m-0">
          {rolesParsed}
        </span>
      </td>

      <td
        data-label="Status"
        className={`${tdStyles} ${isActive ? '' : 'bg-opacity-40'}`}
      >
        <span
          className={`p-1 rounded ${isActive ? 'bg-green-600' : 'bg-red-600'}`}
        >
          {isActive ? 'Ativo' : 'Inativo'}
        </span>
      </td>

      <td data-label="Cadastro" className={tdStyles}>
        <time dateTime={new Date(user.createdAt).toISOString()}></time>
        {new Date(user.createdAt).toLocaleDateString()}
      </td>

      <td data-label="Editar" className={tdStyles}>
        <div className="h-full w-full flex items-center justify-end md:justify-center">
          <button
            type="button"
            onClick={handleEdit}
            className="inline-flex items-center justify-center hover:text-green-500 focus:outline-none focus:text-green-500 focus:ring-2 focus:ring-blue-600 focus:ring-offset-1 focus:ring-offset-zinc-900 rounded"
          >
            <NotePencil className="w-6 h-6 md:w-7 md:h-7" weight="fill" />
          </button>
        </div>
      </td>
    </tr>
  );
}
