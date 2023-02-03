import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Note, QueryError, User } from '../../shared/types';
import { useDeleteNoteMutation, useUpdateNoteMutation } from './notesApiSlice';

import {
  Button,
  Checkbox,
  FormField,
  Loader,
  ResponseError,
  SelectInput,
} from '../../components';

interface EditNoteFormProps {
  note: Note;
  users: User[];
}

const editNoteSchema = z.object({
  title: z.string(),
  text: z.string(),
  completed: z.boolean(),
  userId: z.object({
    value: z.string(),
    label: z.string(),
  }),
});

type EditNoteInputs = z.infer<typeof editNoteSchema>;

export function EditNoteForm({ note, users }: EditNoteFormProps) {
  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();
  const [
    deleteNote,
    {
      isLoading: isDelLoading,
      isSuccess: isDelSuccess,
      isError: isDelError,
      error: delError,
    },
  ] = useDeleteNoteMutation();

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    register,
    formState: { isSubmitting, errors, isValid },
    reset,
  } = useForm<EditNoteInputs>({
    resolver: zodResolver(editNoteSchema),
    defaultValues: {
      title: note.title,
      text: note.text,
      completed: note.completed,
      userId: {
        value: note.userId,
        label: note.owner,
      },
    },
  });

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      reset();
      navigate('/dashboard/notes');
    }
  }, [isSuccess, isDelSuccess, reset, navigate]);

  const options = users.map((user) => {
    return {
      value: user.id,
      label: user.username,
    };
  });

  async function handleUpdateNote(data: EditNoteInputs) {
    try {
      await updateNote({
        id: note.id,
        userId: data.userId.value,
        title: data.title,
        text: data.text,
        completed: data.completed,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteNote() {
    try {
      await deleteNote({
        id: note.id,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleUpdateNote)}
      className="w-full bg-zinc-800 rounded shadow p-4"
    >
      {isError ? (
        <ResponseError>{(error as QueryError)?.data?.error}</ResponseError>
      ) : isDelError ? (
        <ResponseError>{(delError as QueryError)?.data?.error}</ResponseError>
      ) : null}

      <FormField.Root>
        <FormField.Label htmlFor="title">Título</FormField.Label>
        <FormField.Input
          type="text"
          id="title"
          placeholder="título"
          autoComplete="off"
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
            placeholder="Texto"
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
        <div className="flex items-center gap-2">
          <FormField.Label htmlFor="completed">Completada</FormField.Label>
          <Controller
            control={control}
            name="completed"
            render={({ field }) => {
              const { value, onChange, ...rest } = field;

              return (
                <Checkbox
                  id="completed"
                  checked={value}
                  onCheckedChange={onChange}
                  disabled={isSubmitting}
                  {...rest}
                />
              );
            }}
          />
        </div>
        {errors.completed ? (
          <FormField.Error role="alert">
            {errors.completed.message}
          </FormField.Error>
        ) : null}
      </FormField.Root>

      <FormField.Root>
        <FormField.Label htmlFor="username">Atribuída a</FormField.Label>
        <Controller
          control={control}
          name="userId"
          render={({ field }) => {
            const { ref, ...rest } = field;

            return (
              <SelectInput
                innerRef={ref}
                inputId="username"
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

      <div className="flex items-center flex-wrap gap-4 mt-8">
        <Button type="submit" disabled={isSubmitting || !isValid}>
          {isLoading ? <Loader isSmall /> : 'Salvar'}
        </Button>
        <Button
          type="button"
          onClick={handleDeleteNote}
          disabled={isDelLoading}
        >
          {isDelLoading ? <Loader isSmall /> : 'Deletar'}
        </Button>
      </div>
    </form>
  );
}
