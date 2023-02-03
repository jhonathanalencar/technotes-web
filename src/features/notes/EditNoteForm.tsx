import { Checkbox, FormField } from '../../components';

export function EditNoteForm() {
  return (
    <form action="" className="w-full bg-zinc-800 rounded shadow p-4">
      <FormField.Root>
        <FormField.Label htmlFor="title">Título</FormField.Label>
        <FormField.Input type="text" id="title" placeholder="título" required />
      </FormField.Root>

      <FormField.Root>
        <FormField.Label htmlFor="text">Texto</FormField.Label>
        <FormField.Input asChild>
          <textarea
            id="text"
            placeholder="Texto da nota"
            required
            className="h-28 min-h-[112px] max-h-40 resize-y pt-2"
          />
        </FormField.Input>
      </FormField.Root>

      <FormField.Root>
        <div className="flex items-center gap-2">
          <FormField.Label>Completada</FormField.Label>
          <Checkbox />
        </div>
      </FormField.Root>
    </form>
  );
}
