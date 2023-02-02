import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';

import { QueryError, Role, User } from '../../shared/types';
import { userRoles } from '../../shared/data';
import { useDeleteUserMutation, useUpdateUserMutation } from './usersApiSlice';

import { Button, FormField, Loader, RolesSelect } from '../../components';

interface EditUserProps {
  user: User;
}

const updateUserSchema = z.object({
  username: z
    .string({
      required_error: 'nome é requirido',
    })
    .trim()
    .min(1, 'nome é requirido'),
  password: z
    .string()
    .min(6, 'senha precisa ter no mínimo 6 dígitos')
    .optional()
    .or(z.literal('')),
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
  active: z.boolean(),
});

type UpdateUserInputs = z.infer<typeof updateUserSchema>;

function formatRoles(roles: Role[]) {
  return roles.map((role) => {
    return {
      value: role,
      label: userRoles[role as keyof typeof userRoles],
    };
  });
}

export function EditUserForm({ user }: EditUserProps) {
  const [updateUser, { isLoading, isError, error }] = useUpdateUserMutation();
  const [
    deleteUser,
    { isLoading: delIsLoading, isError: delIsError, error: delError },
  ] = useDeleteUserMutation();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    register,
    formState: { isSubmitting, errors, isValid },
    reset,
  } = useForm<UpdateUserInputs>({
    resolver: zodResolver(updateUserSchema),
    mode: 'all',
    defaultValues: {
      username: user.username,
      roles: formatRoles(user.roles),
      password: undefined,
      active: user.active,
    },
  });

  async function handleUpdateUser(data: UpdateUserInputs) {
    try {
      const parsedRoles = data.roles.map((role) => role.value);

      await updateUser({
        id: user.id,
        username: data.username,
        active: data.active,
        roles: parsedRoles,
        password: data.password ? data.password : undefined,
      }).unwrap();

      reset();
      navigate('/dashboard/users');
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteUser() {
    try {
      await deleteUser({
        id: user.id,
      }).unwrap();

      navigate('/dashboard/users');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleUpdateUser)}
      className="w-full bg-zinc-800 p-4 rounded shadow"
    >
      {isError || delIsError ? (
        isError ? (
          <p className="text-red-500 font-medium text-base tracking-wide md:text-lg">
            {(error as QueryError)?.data?.error}
          </p>
        ) : (
          <p className="text-red-500 font-medium text-base tracking-wide md:text-lg">
            {(delError as QueryError)?.data?.error}
          </p>
        )
      ) : null}

      <FormField.Root>
        <FormField.Label htmlFor="username">Nome de usuário</FormField.Label>
        <FormField.Input
          type="text"
          id="username"
          placeholder="Jennie"
          required
          disabled={isSubmitting}
          {...register('username')}
        />
        {errors.username ? (
          <FormField.Error>{errors.username.message}</FormField.Error>
        ) : null}
      </FormField.Root>

      <FormField.Root>
        <FormField.Label htmlFor="password">Senha</FormField.Label>
        <FormField.Input
          type="password"
          id="password"
          placeholder="******"
          disabled={isSubmitting}
          {...register('password')}
        />
        {errors.password ? (
          <FormField.Error>{errors.password.message}</FormField.Error>
        ) : null}
      </FormField.Root>

      <FormField.Root>
        <FormField.Label htmlFor="roles">Tipo de usuário</FormField.Label>
        <Controller
          control={control}
          name="roles"
          render={({ field }) => {
            const { ref, ...rest } = field;

            return (
              <RolesSelect innerRef={ref} isDisabled={isSubmitting} {...rest} />
            );
          }}
        />
        {errors.roles ? (
          <FormField.Error>{errors.roles.message}</FormField.Error>
        ) : null}
      </FormField.Root>

      <FormField.Root>
        <div className="flex items-center gap-2">
          <FormField.Label>Ativo</FormField.Label>
          <Controller
            control={control}
            name="active"
            render={({ field }) => {
              const { value, onChange, ...rest } = field;

              return (
                <Checkbox.Root
                  className="h-8 w-8 bg-zinc-900 flex items-center justify-center rounded focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 focus-within:ring-offset-zinc-800 disabled:opacity-70"
                  checked={value}
                  onCheckedChange={onChange}
                  {...rest}
                >
                  <Checkbox.Indicator className="h-6 w-6">
                    <Check className="h-6 w-6 text-green-500" weight="bold" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
              );
            }}
          />
        </div>
      </FormField.Root>

      <div className="flex gap-4 mt-8">
        <Button type="submit" disabled={isSubmitting || !isValid}>
          {isLoading ? <Loader isSmall /> : 'Salvar'}
        </Button>
        <Button variant="red" onClick={handleDeleteUser}>
          {delIsLoading ? <Loader isSmall /> : 'Deletar'}
        </Button>
      </div>
    </form>
  );
}
