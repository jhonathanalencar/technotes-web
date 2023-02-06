import { useAuth } from '../hooks/useAuth';

export function DashboardFooter() {
  const { username, status } = useAuth();

  return (
    <footer className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-6 border-t-2 border-gray-500 py-4 md:py-6">
      <span className="text-gray-300 text-lg font-medium md:text-xl">
        Usuário Atual:
        <span className="text-gray-100 font-semibold"> {username}</span>
      </span>
      <span className="text-gray-300 text-lg font-medium md:text-xl">
        Status:<span className="text-gray-100 font-semibold"> {status}</span>
      </span>
    </footer>
  );
}
