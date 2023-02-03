import { GoBackHeader } from '../../components';
import { NewNoteForm } from './NewNoteForm';

export function NewNote() {
  return (
    <section className="h-full w-full pt-4">
      <GoBackHeader>Adicionar Nota</GoBackHeader>

      <div className="w-full max-w-3xl mx-auto mt-8">
        <NewNoteForm />
      </div>
    </section>
  );
}
