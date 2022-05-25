/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface Tutor {
  id: string | null;
  name: string | null;
}

interface ScheduleTutoringState {
  subject: string | null;
  tutor: Tutor;
  date: string | null;
  time: string | null;
  title: string | null;
  description: string | null;
  file: string | null;
}

// Define the initial state using that type
const initialState: ScheduleTutoringState = {
  subject: 'TC1003B - Implementación de métodos computacionales',
  tutor: {
    id: null,
    name: null
  },
  date: '18 de Marzo',
  time: '12:00 PM - 1:00 PM',
  title: null,
  description: null,
  file: null
};

export const scheduleTutoringSlice = createSlice({
  name: 'scheduleTutoring',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSubject: (state, action: PayloadAction<string>) => {
      state.subject = action.payload;
    },
    setTutor: (state, action: PayloadAction<Tutor>) => {
      state.tutor = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setTime: (state, action: PayloadAction<string>) => {
      state.time = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setFile: (state, action: PayloadAction<string>) => {
      state.file = action.payload;
    },
    reset: (state) => {
      state.subject = null;
      state.tutor = {
        id: null,
        name: null
      };
      state.date = null;
      state.time = null;
      state.title = null;
      state.description = null;
      state.file = null;
    }
  }
});

export const {
  setSubject,
  setTutor,
  setDate,
  setTime,
  setDescription,
  setTitle,
  setFile
} = scheduleTutoringSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSubject = (state: RootState) =>
  state.scheduleTutoring.subject;
export const selectDate = (state: RootState) => state.scheduleTutoring.date;
export const selectTime = (state: RootState) => state.scheduleTutoring.time;

export default scheduleTutoringSlice.reducer;
