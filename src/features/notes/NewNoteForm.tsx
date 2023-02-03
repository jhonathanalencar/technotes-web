import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useCreateNoteMutation } from './notesApiSlice';
import { QueryError, User } from '../../shared/types';

import {
  Button,
  FormField,
  Loader,
  ResponseError,
  SelectInput,
} from '../../components';

const createNewNoteSchema = z.object({
  title: z
    .string({
      required_error: 'título é requirido',
    })
    .trim()
    .min(1, 'título é requirido'),
  text: z
    .string({
      required_error: 'texto é requirido',
    })
    .trim()
    .min(1, 'texto é requirido'),
  userId: z.object(
    {
      value: z.string(),
      label: z.string(),
    },
    {
      required_error: 'selecione um usuário',
    }
  ),
});

type CreateNewNoteInputs = z.infer<typeof createNewNoteSchema>;

interface NewNoteFormProps {
  users: User[];
}

export function NewNoteForm({ users }: NewNoteFormProps) {
  const [createNewNote, { isLoading, isError, error }] =
    useCreateNoteMutation();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    register,
    formState: { isSubmitting, errors, isValid },
    reset,
  } = useForm<CreateNewNoteInputs>({
    resolver: zodResolver(createNewNoteSchema),
    mode: 'all',
  });

  async function handleCreateNewNote(data: CreateNewNoteInputs) {
    try {
      await createNewNote({
        title: data.title,
        text: data.text,
        userId: data.userId.value,
      }).unwrap();

      reset();
      navigate('/dashboard/notes');
    } catch (error) {
      console.log(error);
    }
  }

  const options = users.map((user) => {
    return {
      value: user.id,
      label: user.username,
    };
  });

  return (
    <form
      onSubmit={handleSubmit(handleCreateNewNote)}
      className="w-full bg-zinc-800 rounded shadow p-4"
    >
      {isError ? (
        <ResponseError>{(error as QueryError)?.data?.error}</ResponseError>
      ) : null}

      <FormField.Root>
        <FormField.Label htmlFor="title">Título</FormField.Label>
        <FormField.Input
          type="text"
          id="title"
          placeholder="Título da nota"
          aria-invalid={errors.title ? true : false}
          required
          disabled={isSubmitting}
          {...register('title')}
        />
        {errors.title ? (
          <FormField.Error role="alert">{errors.title.message}</FormField.Error>
        ) : null}
      </FormField.Root>

      <FormField.Root>
        <FormField.Label htmlFor="text">Texto</FormField.Label>
        <FormField.Input asChild>
          <textarea
            id="text"
            className="h-28 min-h-[112px] max-h-40 resize-y pt-2"
            placeholder="Texto da nota"
            aria-invalid={errors.text ? true : false}
            required
            disabled={isSubmitting}
            {...register('text')}
          />
        </FormField.Input>
        {errors.text ? (
          <FormField.Error role="alert">{errors.text.message}</FormField.Error>
        ) : null}
      </FormField.Root>

      <FormField.Root>
        <FormField.Label htmlFor="owner">Atribuída a</FormField.Label>
        <Controller
          control={control}
          name="userId"
          render={({ field }) => {
            const { ref, ...rest } = field;
            return (
              <SelectInput
                innerRef={ref}
                inputId="owner"
                aria-invalid={errors.userId ? true : false}
                options={options}
                isDisabled={isSubmitting}
                {...rest}
              />
            );
          }}
        />
        {errors.userId ? (
          <FormField.Error role="alert">
            {errors.userId.message}
          </FormField.Error>
        ) : null}
      </FormField.Root>

      <Button type="submit" disabled={isSubmitting || !isValid}>
        {isLoading ? <Loader isSmall /> : 'Adicionar'}
      </Button>
    </form>
  );
}
