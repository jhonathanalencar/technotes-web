import { ReactNode, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

import { usePersist } from '../../hooks/usePersist';
import { QueryError } from '../../shared/types';
import { useRefreshMutation } from './authApiSlice';
import { selectCurrentToken } from './authSlice';

import { Loader, ResponseError } from '../../components';

export function PersistLogin() {
  const { persist } = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      const verifyRefreshToken = async () => {
        try {
          await refresh();

          setTrueSuccess(true);
        } catch (error) {
          console.log(error);
        }
      };

      if (!token && persist) {
        verifyRefreshToken();
      }
    }

    return () => {
      effectRan.current = true;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let content: ReactNode = null;
  if (!persist) {
    content = <Outlet />;
  } else if (isLoading) {
    content = (
      <section className="p-4">
        <Loader />
      </section>
    );
  } else if (isError) {
    content = (
      <section className="p-4 flex items-start gap-4 flex-col">
        <ResponseError>
          <span className="text-xl md:text-2xl">
            {(error as QueryError)?.data?.error}
          </span>
        </ResponseError>
        <Link
          to="/login"
          className="text-gray-300 font-semibold text-lg md:text-xl underline hover:text-gray-400"
        >
          Por favor faça o login novamente
        </Link>
      </section>
    );
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />;
  } else if (token && isUninitialized) {
    content = <Outlet />;
  }

  return content;
}
