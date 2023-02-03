interface DateTimeInfoProps {
  createdAt: Date;
  updatedAt: Date;
}

export function DateTimeInfo({ createdAt, updatedAt }: DateTimeInfoProps) {
  function formatDateTime(date: Date) {
    return Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'medium',
    }).format(new Date(date));
  }

  return (
    <div className="flex flex-col items-start gap-2 my-6">
      <time className="text-gray-300 text-base md:text-lg font-medium">
        Criado em {formatDateTime(createdAt)}
      </time>
      <time className="text-gray-300 text-base md:text-lg font-medium">
        Última atualização em {formatDateTime(updatedAt)}
      </time>
    </div>
  );
}
