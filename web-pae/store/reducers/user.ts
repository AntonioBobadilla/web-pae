import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  token: string | null;
}

// Define the initial state using that type
const initialState: UserState = {
  id: null,
  name: 'Daniela Sánchez Hernández',
  email: null,
  token: null
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
    login: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.token = null;
    }
  }
});

export const { setID, setName, setEmail, setToken, login, logout } =
  userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectID = (state: RootState) => state.user.id;
export const selectName = (state: RootState) => state.user.name;

export default userSlice.reducer;
