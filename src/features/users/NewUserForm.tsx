import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useCreateUserMutation } from './usersApiSlice';
import { QueryError } from '../../shared/types';

import { Button, Loader, FormField, RolesSelect } from '../../components';

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
      }),
      {
        required_error: 'usuário precisa ter no mínimo 1 tipo',
      }
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
    mode: 'all',
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

      <FormField.Root>
        <FormField.Label htmlFor="username">Nome de usuário</FormField.Label>
        <FormField.Input
          type="text"
          id="username"
          placeholder="Jeenie"
          autoComplete="off"
          aria-invalid={errors.username ? true : false}
          required
          disabled={isSubmitting}
          {...register('username')}
        />
        {errors.username ? (
          <FormField.Error role="alert">
            {errors.username.message}
          </FormField.Error>
        ) : null}
      </FormField.Root>

      <FormField.Root>
        <FormField.Label htmlFor="password">Password</FormField.Label>
        <FormField.Input
          type="password"
          id="password"
          placeholder="******"
          aria-invalid={errors.password ? true : false}
          required
          disabled={isSubmitting}
          {...register('password')}
        />

        {errors.password ? (
          <FormField.Error role="alert">
            {errors.password.message}
          </FormField.Error>
        ) : null}
      </FormField.Root>

      <FormField.Root>
        <FormField.Label htmlFor="roles">Tipo de usuário</FormField.Label>
        <Controller
          name="roles"
          control={control}
          render={({ field }) => {
            const { ref, ...rest } = field;

            return (
              <RolesSelect innerRef={ref} isDisabled={isSubmitting} {...rest} />
            );
          }}
        />
        {errors.roles ? (
          <FormField.Error role="alert">{errors.roles.message}</FormField.Error>
        ) : null}
      </FormField.Root>

      <Button type="submit" disabled={isSubmitting || !isValid}>
        {isLoading ? <Loader isSmall /> : 'Cadastrar'}
      </Button>
    </form>
  );
}
