import { ReactNode, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignOut } from 'phosphor-react';

import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import { QueryError } from '../shared/types';

import { ResponseError, Loader } from './';

export function DashboardHeader() {
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess, navigate]);

  let content: ReactNode = null;

  if (isLoading) {
    content = <Loader message="Saindo..." />;
  } else if (isError) {
    content = (
      <ResponseError>{(error as QueryError)?.data?.error}</ResponseError>
    );
  } else {
    content = (
      <>
        <Link to="/dashboard" className="rounded focus-highlight">
          <span className="text-gray-100 text-3xl font-bold md:text-4xl">
            techNotes
          </span>
        </Link>
        <nav>
          <button
            type="button"
            aria-label="Sair"
            onClick={sendLogout}
            disabled={isLoading}
            className="inline-flex rounded focus-highlight group"
          >
            <SignOut className="text-gray-300 h-8 w-8 md:w-10 md:h-10 hover:text-gray-400 group-focus:text-gray-400 transition-colors duration-200" />
          </button>
        </nav>
      </>
    );
  }

  return (
    <header className="flex items-center justify-between border-b-2 border-gray-500 py-4 md:py-6">
      {content}
    </header>
  );
}
