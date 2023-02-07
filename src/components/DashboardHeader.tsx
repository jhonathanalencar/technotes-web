import { ReactNode, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FilePlus, Files, SignOut, UserGear, UserPlus } from 'phosphor-react';

import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import { QueryError } from '../shared/types';
import { useAuth } from '../hooks/useAuth';

import { ResponseError, Loader, DashboardNavButton } from './';

const NOTES_PATH_REGEX = /\/dashboard\/notes(\/)?$/;
const USERS_PATH_REGEX = /\/dashboard\/users(\/)?$/;

export function DashboardHeader() {
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  const { isAdmin, isManager } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess, navigate]);

  function onNewNoteClicked() {
    navigate('/dashboard/notes/new');
  }
  function onNewUserClicked() {
    navigate('/dashboard/users/new');
  }
  function onNotesClicked() {
    navigate('/dashboard/notes');
  }
  function onUsersClicked() {
    navigate('/dashboard/users');
  }

  let newNoteButton: ReactNode = null;
  if (NOTES_PATH_REGEX.test(pathname)) {
    newNoteButton = (
      <DashboardNavButton
        icon={<FilePlus />}
        aria-label="Nova nota"
        onClick={onNewNoteClicked}
        disabled={isLoading}
      />
    );
  }

  let newUserButton: ReactNode = null;
  if (USERS_PATH_REGEX.test(pathname)) {
    newUserButton = (
      <DashboardNavButton
        icon={<UserPlus />}
        aria-label="Novo usuário"
        onClick={onNewUserClicked}
        disabled={isLoading}
      />
    );
  }

  let usersButton: ReactNode = null;
  if (isAdmin || isManager) {
    if (!USERS_PATH_REGEX.test(pathname) && pathname.includes('/dashboard')) {
      usersButton = (
        <DashboardNavButton
          icon={<UserGear />}
          aria-label="Usuários"
          onClick={onUsersClicked}
          disabled={isLoading}
        />
      );
    }
  }

  let notesButton: ReactNode = null;
  if (isAdmin || isManager) {
    if (!NOTES_PATH_REGEX.test(pathname) && pathname.includes('/dashboard')) {
      notesButton = (
        <DashboardNavButton
          icon={<Files />}
          aria-label="Notas"
          onClick={onNotesClicked}
          disabled={isLoading}
        />
      );
    }
  }

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
          <span className="text-gray-100 text-2xl sm:text-3xl font-bold md:text-4xl">
            techNotes
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          {newNoteButton}
          {newUserButton}
          {notesButton}
          {usersButton}

          <DashboardNavButton
            icon={<SignOut />}
            aria-label="Sair"
            onClick={sendLogout}
            disabled={isLoading}
          />
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
