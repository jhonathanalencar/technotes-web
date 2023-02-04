import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

interface SetCredentialsPayload {
  accessToken: string;
}

interface State {
  token: string | null;
}

const initialState: State = {
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<SetCredentialsPayload>) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
