/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  token: string | null;
  role: string | null;
}

// Define the initial state using that type
const initialState: UserState = {
  id: null,
  name: 'Daniela Sánchez Hernández',
  email: 'dani@tec.mx',
  token: '',
  role: null
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setID: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setLoginData: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.id = action.payload.id;
    },
    setLogoutData: (state) => {
      state.name = null;
      state.email = null;
      state.token = null;
      state.role = null;
    }
  }
});

export const { setName, setEmail, setToken, setLoginData, setLogoutData } =
  userSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const selectName = (state: RootState) => state.user.name;
export const selectRole = (state: RootState) => state.user.role;
export const selectToken = (state: RootState) => state.user.token;
export const selectEmail = (state: RootState) => state.user.email;
export const selectID = (state: RootState) => state.user.id;

export default userSlice.reducer;
