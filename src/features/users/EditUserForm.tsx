import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { User } from '../../shared/types';

interface EditUserProps {
  user: User;
}

const updateUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  roles: z.enum(['Employee', 'Manager', 'Admin']).array(),
  active: z.boolean(),
});

type UpdateUserInputs = z.infer<typeof updateUserSchema>;

export function EditUserForm({ user }: EditUserProps) {
  const { handleSubmit, register } = useForm<UpdateUserInputs>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      username: user.username,
      roles: user.roles,
      active: user.active,
    },
  });

  const labelStyles = 'text-lg md:text-xl text-gray-200 font-semibold';
  const inputStyles =
    'w-full h-12 px-4 text-base md:text-lg font-medium text-gray-300 placeholder:text-gray-400 bg-zinc-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-zinc-800';
  const errorStyles = 'text-base font-medium text-red-500';

  return (
    <form className="w-full bg-zinc-800 p-4 rounded shadow">
      <label htmlFor="username" className={labelStyles}>
        Usuário
      </label>
      <input type="text" id="username" className={inputStyles} />
      <label htmlFor="password" className={labelStyles}>
        Senha
      </label>
      <input type="password" id="password" className={inputStyles} />
      <label htmlFor="roles" className={labelStyles}>
        Tipo de usuário
      </label>
      <select id="roles" className={inputStyles} />
      <label htmlFor="active" className={labelStyles}>
        Ativo
      </label>
      <input type="checkbox" />
    </form>
  );
}
