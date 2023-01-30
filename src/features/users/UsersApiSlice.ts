import {
  createEntityAdapter,
  EntityState,
  createSelector,
} from '@reduxjs/toolkit';

import { apiSlice } from '../../redux/api/apiSlice';
import { RootState } from '../../redux/store';
import { User } from '../../shared/types';

type GetUsersResponse = (Omit<User, 'id'> & { _id: string })[];

const usersAdapter = createEntityAdapter<User>();

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<EntityState<User>, void>({
      query: () => ({
        url: '/users',
        method: 'GET',
        validateStatus: (response, result) => {
          console.log(result);
          return response.status === 200 && !result.error;
        },
      }),
      keepUnusedDataFor: 5,
      transformResponse: (response: GetUsersResponse) => {
        const loadedUsers = response.map((user) => {
          return {
            id: user._id,
            username: user.username,
            roles: user.roles,
            active: user.active,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          };
        });

        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result) => {
        if (result && result.ids) {
          return [
            { type: 'User', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'User' as const, id })),
          ];
        } else {
          return [{ type: 'User', id: 'LIST' }];
        }
      },
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors(
  (state: RootState) => selectUsersData(state) ?? initialState
);
