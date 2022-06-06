/* eslint-disable no-param-reassign */
import { Subject } from '@/components/search-bar';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface Tutor {
  id: string | null;
  name: string | null;
}

interface ScheduleTutoringState {
  subject: Subject | null;
  tutor: Tutor;
  date: string | null;
  time: string | null;
  title: string;
  content: string;
  file: string | null;
  modalidad: string | null;
}

// Define the initial state using that type
const initialState: ScheduleTutoringState = {
  subject: null,
  tutor: {
    id: null,
    name: null
  },
  date: '18 de Marzo',
  time: '12:00 PM - 1:00 PM',
  modalidad: 'Presencial',
  title: '',
  content: '',
  file: null
};

export const scheduleTutoringSlice = createSlice({
  name: 'scheduleTutoring',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSubject: (state, action: PayloadAction<Subject>) => {
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
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    setFile: (state, action: PayloadAction<string>) => {
      state.file = action.payload;
    },
    setModalidad: (state, action: PayloadAction<string>) => {
      state.modalidad = action.payload;
    },
    reset: (state) => {
      state.subject = null;
      state.tutor = {
        id: null,
        name: null
      };
      state.date = null;
      state.time = null;
      state.title = '';
      state.content = '';
      state.file = null;
    }
  }
});

export const {
  setSubject,
  setTutor,
  setDate,
  setTime,
  setContent,
  setTitle,
  setFile,
  setModalidad
} = scheduleTutoringSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSubject = (state: RootState) =>
  state.scheduleTutoring.subject;
export const selectDate = (state: RootState) => state.scheduleTutoring.date;
export const selectTime = (state: RootState) => state.scheduleTutoring.time;
export const selectTutor = (state: RootState) => state.scheduleTutoring.tutor;
export const selectTitle = (state: RootState) => state.scheduleTutoring.title;
export const selectContent = (state: RootState) =>
  state.scheduleTutoring.content;
export const selectFile = (state: RootState) => state.scheduleTutoring.file;
export const selectModalidad = (state: RootState) =>
  state.scheduleTutoring.modalidad;

export default scheduleTutoringSlice.reducer;
