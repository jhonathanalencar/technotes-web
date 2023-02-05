import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useLoginMutation } from './authApiSlice';
import { QueryError } from '../../shared/types';
import { setCredentials } from './authSlice';
import { usePersist } from '../../hooks/usePersist';

import {
  Button,
  Checkbox,
  FormField,
  Loader,
  ResponseError,
} from '../../components';

const loginFormSchema = z.object({
  username: z
    .string({
      required_error: 'Nome de usuário é requirido',
    })
    .trim()
    .min(1, 'Nome de usuário é requirido'),
  password: z
    .string({
      required_error: 'Senha é requirida',
    })
    .trim()
    .min(1, 'Senha é requirida'),
  persist: z.boolean().optional(),
});

type LoginFormInputs = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const [login, { isLoading, isError }] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { persist, setPersist } = usePersist();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
    mode: 'all',
    defaultValues: {
      persist,
    },
  });

  function handleTogglePersist() {
    setPersist((prev) => !prev);
  }

  async function handleLogin(data: LoginFormInputs) {
    try {
      const { accessToken } = await login(data).unwrap();
      dispatch(setCredentials({ accessToken }));

      reset();
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      if (!(error as QueryError).status) {
        setErrorMessage('Sem resposta do servidor');
      } else if ((error as QueryError).status === 400) {
        setErrorMessage('Nome de usuário ou senha inválidos');
      } else if ((error as QueryError).status === 401) {
        setErrorMessage('Não autorizado');
      } else {
        setErrorMessage(
          (error as QueryError).data?.error ??
            'Não foi possível realizar o login.'
        );
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="w-full bg-zinc-800 rounded shadow p-4"
    >
      {isError ? <ResponseError>{errorMessage}</ResponseError> : null}

      <FormField.Root>
        <FormField.Label htmlFor="username">Nome de usuário</FormField.Label>
        <FormField.Input
          type="text"
          id="username"
          placeholder="Insira o username"
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
        <FormField.Label htmlFor="password">Senha</FormField.Label>
        <FormField.Input
          type="password"
          id="password"
          placeholder="Insira a senha"
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
        <div className="flex items-center gap-2">
          <Controller
            control={control}
            name="persist"
            render={({ field }) => {
              const { value, onChange, ...rest } = field;

              return (
                <Checkbox
                  id="persist"
                  checked={value}
                  onCheckedChange={(event) => {
                    onChange(event);
                    handleTogglePersist();
                  }}
                  disabled={isSubmitting}
                  {...rest}
                />
              );
            }}
          />
          <FormField.Label htmlFor="persist">Manter login</FormField.Label>
        </div>
      </FormField.Root>

      <Button type="submit" disabled={isSubmitting || !isValid}>
        {isLoading ? <Loader isSmall /> : 'Entrar'}
      </Button>
    </form>
  );
}
