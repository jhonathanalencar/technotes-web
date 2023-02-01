import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { styles } from '../../configs/reactSelect';
import { userRoles } from '../../shared/data';
import { useCreateUserMutation } from './usersApiSlice';
import { QueryError } from '../../shared/types';

import { Button, Loader } from '../../components';

const addNewUserSchema = z.object({
  username: z
    .string({
      required_error: 'nome é requirido',
    })
    .trim()
    .min(1, 'nome é requirido'),
  password: z
    .string({
      required_error: 'senha é requirida',
    })
    .trim()
    .min(6, 'senha precisa ter no mínimo 6 dígitos'),
  roles: z
    .array(
      z.object({
        value: z.enum(['Employee', 'Manager', 'Admin']),
        label: z.string(),
      })
    )
    .min(1, 'usuário precisa ter no mínimo 1 tipo'),
});

type AddNewUserInputs = z.infer<typeof addNewUserSchema>;

export function NewUserForm() {
  const [addNewUser, { isLoading, isError, error }] = useCreateUserMutation();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isSubmitting, isValid },
    reset,
    setValue,
  } = useForm<AddNewUserInputs>({
    resolver: zodResolver(addNewUserSchema),
  });

  const labelStyles = 'text-lg md:text-xl text-gray-200 font-semibold';
  const inputStyles =
    'w-full h-12 px-4 text-base md:text-lg font-medium text-gray-300 placeholder:text-gray-400 bg-zinc-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-zinc-800';
  const errorStyles = 'text-base font-medium text-red-500';

  const options = Object.keys(userRoles).map((key) => {
    return {
      value: key,
      label: userRoles[key as keyof typeof userRoles],
    };
  });

  async function handleAddNewUser(data: AddNewUserInputs) {
    const parsedRoles = data.roles.map((role) => role.value);

    try {
      await addNewUser({
        username: data.username,
        password: data.password,
        roles: parsedRoles,
      }).unwrap();

      reset();
      setValue('roles', []);
      navigate('/dashboard/users');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleAddNewUser)}
      className="w-full bg-zinc-800 p-4 rounded shadow"
    >
      {isError ? (
        <p className="text-red-500 font-medium text-base tracking-wide md:text-lg">
          {(error as QueryError)?.data?.error}
        </p>
      ) : null}

      <div className="mb-4">
        <label htmlFor="username" className={labelStyles}>
          Nome de usuário
        </label>
        <input
          type="text"
          id="username"
          placeholder="Jeenie"
          autoComplete="off"
          required
          disabled={isSubmitting}
          className={inputStyles}
          {...register('username')}
        />
        {errors.username ? (
          <p className={errorStyles}>{errors.username.message}</p>
        ) : null}
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
          required
          disabled={isSubmitting}
          {...register('password')}
        />
        {errors.password ? (
          <p className={errorStyles}>{errors.password.message}</p>
        ) : null}
      </div>

      <div className="mb-4">
        <label htmlFor="roles" className={labelStyles}>
          Tipo de usuário
        </label>
        <Controller
          name="roles"
          control={control}
          render={({ field }) => {
            return (
              <Select
                inputId="roles"
                isMulti
                options={options}
                placeholder="Selecione..."
                noOptionsMessage={() => 'Sem opções'}
                styles={styles}
                required
                isDisabled={isSubmitting}
                {...field}
              />
            );
          }}
        />
        {errors.roles ? (
          <p className={errorStyles}>{errors.roles.message}</p>
        ) : null}
      </div>

      <Button type="submit" disabled={isSubmitting || !isValid}>
        {isLoading ? <Loader isSmall /> : 'Cadastrar'}
      </Button>
    </form>
  );
}
