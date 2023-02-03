import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { QueryError, Role, User } from '../../shared/types';
import { rolesSelectOptions, userRoles } from '../../shared/data';
import { useDeleteUserMutation, useUpdateUserMutation } from './usersApiSlice';

import {
  Button,
  Checkbox,
  FormField,
  Loader,
  SelectInput,
  ResponseError,
} from '../../components';

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
    .trim()
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
          <ResponseError>{(error as QueryError)?.data?.error}</ResponseError>
        ) : (
          <ResponseError>{(delError as QueryError)?.data?.error}</ResponseError>
        )
      ) : null}

      <FormField.Root>
        <FormField.Label htmlFor="username">Nome de usuário</FormField.Label>
        <FormField.Input
          type="text"
          id="username"
          placeholder="Jennie"
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
        <FormField.Label htmlFor="password">Senha</FormField.Label>
        <FormField.Input
          type="password"
          id="password"
          placeholder="******"
          aria-invalid={errors.password ? true : false}
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
          control={control}
          name="roles"
          render={({ field }) => {
            const { ref, ...rest } = field;

            return (
              <SelectInput
                innerRef={ref}
                inputId="roles"
                isMulti
                options={rolesSelectOptions}
                aria-invalid={errors.roles ? true : false}
                isDisabled={isSubmitting}
                {...rest}
              />
            );
          }}
        />
        {errors.roles ? (
          <FormField.Error role="alert">{errors.roles.message}</FormField.Error>
        ) : null}
      </FormField.Root>

      <FormField.Root>
        <div className="flex items-center gap-2">
          <FormField.Label htmlFor="active">Ativo</FormField.Label>
          <Controller
            control={control}
            name="active"
            render={({ field }) => {
              const { value, onChange, ...rest } = field;

              return (
                <Checkbox
                  id="active"
                  checked={value}
                  onCheckedChange={onChange}
                  {...rest}
                />
              );
            }}
          />
          {errors.active ? (
            <FormField.Error role="alert">
              {errors.active.message}
            </FormField.Error>
          ) : null}
        </div>
      </FormField.Root>

      <div className="flex gap-4 mt-8">
        <Button type="submit" disabled={isSubmitting || !isValid}>
          {isLoading ? <Loader isSmall /> : 'Salvar'}
        </Button>
        <Button onClick={handleDeleteUser} disabled={delIsLoading}>
          {delIsLoading ? <Loader isSmall /> : 'Deletar'}
        </Button>
      </div>
    </form>
  );
}
