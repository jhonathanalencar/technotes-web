import {
  createEntityAdapter,
  createSelector,
  EntityState,
} from '@reduxjs/toolkit';

import { apiSlice } from '../../redux/api/apiSlice';
import { RootState } from '../../redux/store';
import { Note } from '../../shared/types';

type GetNotesResponse = (Omit<Note, 'id'> & { _id: string })[];

const notesAdapter = createEntityAdapter<Note>({});

const initialState = notesAdapter.getInitialState();

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query<EntityState<Note>, void>({
      query: () => ({
        url: '/notes',
        method: 'GET',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.error;
        },
      }),
      keepUnusedDataFor: 5,
      transformResponse: (response: GetNotesResponse) => {
        const loadedNotes = response.map((note) => {
          return {
            id: note._id,
            userId: note.userId,
            title: note.title,
            text: note.text,
            completed: note.completed,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
          };
        });

        return notesAdapter.setAll(initialState, loadedNotes);
      },
      providesTags: (result) => {
        if (result && result.ids) {
          return [
            { type: 'Note', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Note' as const, id })),
          ];
        } else {
          return [{ type: 'Note', id: 'LIST' }];
        }
      },
    }),
  }),
});

export const { useGetNotesQuery } = notesApiSlice;

export const selectNotesResult = notesApiSlice.endpoints.getNotes.select();

const selectNotesData = createSelector(
  selectNotesResult,
  (notesResult) => notesResult.data
);

export const {
  selectAll: selectAllNotes,
  selectById: selectNoteById,
  selectIds: selectNoteIds,
} = notesAdapter.getSelectors(
  (state: RootState) => selectNotesData(state) ?? initialState
);
