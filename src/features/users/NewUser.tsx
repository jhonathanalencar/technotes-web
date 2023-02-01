import Select from 'react-select';

import { styles } from '../../configs/reactSelect';
import { userRoles } from '../../shared/data';
import { useCreateUserMutation } from './usersApiSlice';

import { Button, GoBackHeader } from '../../components';

export function NewUser() {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useCreateUserMutation();

  const labelStyles = 'text-lg md:text-xl text-gray-200 font-semibold';
  const inputStyles =
    'w-full h-12 px-4 text-base md:text-lg font-medium text-gray-300 placeholder:text-gray-400 bg-zinc-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-zinc-800';

  const options = Object.keys(userRoles).map((key) => {
    return {
      value: key,
      label: userRoles[key as keyof typeof userRoles],
    };
  });

  function handleAddNewUser() {}

  return (
    <section className="h-full w-full mt-4">
      <GoBackHeader>Cadastro de Usuário</GoBackHeader>

      <div className="w-full max-w-3xl mx-auto mt-8">
        <form className="w-full bg-zinc-800 p-4 rounded shadow">
          <div className="mb-4">
            <label htmlFor="username" className={labelStyles}>
              Nome de usuário
            </label>
            <input
              type="text"
              id="username"
              placeholder="Jeenie"
              autoComplete="off"
              className={inputStyles}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className={labelStyles}>
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="******"
              className={inputStyles}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="roles" className={labelStyles}>
              Tipo de usuário
            </label>
            <Select
              inputId="roles"
              options={options}
              isMulti
              className="react-select"
              placeholder="Selecione..."
              noOptionsMessage={() => 'Sem opções'}
              styles={styles}
            />
          </div>

          <Button onClick={handleAddNewUser}>Cadastrar</Button>
        </form>
      </div>
    </section>
  );
}
