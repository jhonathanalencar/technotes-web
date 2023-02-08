import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { setCredentials } from '../../features/auth/authSlice';
import { QueryError } from '../../shared/types';

import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_SERVER_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

interface RefreshQueryResponse {
  accessToken: string;
}

async function baseQueryWithReauth(
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

    if (refreshResult?.data) {
      api.dispatch(
        setCredentials({ ...(refreshResult.data as RefreshQueryResponse) })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        const error = refreshResult.error as QueryError;
        if (error.data) {
          error.data.error = 'Seu acesso expirou';
        }
      }

      return refreshResult;
    }
  }

  return result;
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Note', 'User'],
  endpoints: () => ({}),
});
