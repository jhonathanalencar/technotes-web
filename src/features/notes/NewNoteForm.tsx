import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useCreateNoteMutation } from './notesApiSlice';
import { QueryError } from '../../shared/types';

import { Button, FormField, Loader } from '../../components';

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
});

type CreateNewNoteInputs = z.infer<typeof createNewNoteSchema>;

export function NewNoteForm() {
  const [createNewNote, { isLoading, isError, error }] =
    useCreateNoteMutation();
  const navigate = useNavigate();

  const {
    handleSubmit,
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
        userId: '7ac72783-bfd0-4326-9204-d4f5acb91ff7',
      }).unwrap();

      reset();
      navigate('/dashboard/notes');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateNewNote)}
      className="w-full bg-zinc-800 rounded shadow p-4"
    >
      {isError ? (
        <p className="text-red-500 font-medium text-base tracking-wide md:text-lg">
          {(error as QueryError)?.data?.error}
        </p>
      ) : null}

      <FormField.Root>
        <FormField.Label htmlFor="title">Título</FormField.Label>
        <FormField.Input
          type="text"
          id="title"
          placeholder="Título da nota"
          required
          disabled={isSubmitting}
          {...register('title')}
        />
        {errors.title ? (
          <FormField.Error>{errors.title.message}</FormField.Error>
        ) : null}
      </FormField.Root>

      <FormField.Root>
        <FormField.Label htmlFor="text">Texto</FormField.Label>
        <FormField.Input asChild>
          <textarea
            id="text"
            placeholder="Texto da nota"
            required
            disabled={isSubmitting}
            className="h-28 min-h-[112px] max-h-40 resize-y pt-2"
            {...register('text')}
          />
        </FormField.Input>
        {errors.text ? (
          <FormField.Error>{errors.text.message}</FormField.Error>
        ) : null}
      </FormField.Root>

      <Button type="submit" disabled={isSubmitting || !isValid}>
        {isLoading ? <Loader isSmall /> : 'Adicionar'}
      </Button>
    </form>
  );
}
