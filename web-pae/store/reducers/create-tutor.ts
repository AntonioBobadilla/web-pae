/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import { Subject } from '@/components/search-bar';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateTutorState, days, Period } from 'store/types';
import type { RootState } from '../store';

// Define the initial state using that type
const initialState: CreateTutorState = {
  name: '',
  email: '',
  major: '',
  password: '',
  passwordConfirmation: '',
  schedule: {
    firstPeriod: [],
    secondPeriod: [],
    thirdPeriod: []
  },
  subjects: [],
  isLoading: false,
  error: ''
};

export const registerTutor = createAsyncThunk(
  'registration/tutor',
  async (arg, thunkAPI) => {
    const { getState } = thunkAPI;
    const {
      createTutor: {
        name,
        email,
        // major,
        password,
        passwordConfirmation,
        schedule: { firstPeriod, secondPeriod, thirdPeriod },
        subjects
      }
    } = getState();

    const post = (data: any, url: string) =>
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        cache: 'no-cache',
        credentials: 'same-origin'
        // mode: 'cors'
      });

    return post(
      {
        user: {
          password,
          confirm_password: passwordConfirmation
        },
        email,
        name,
        // major,
        schedules: [
          ...firstPeriod.map(({ dia, inicio }: Period) => ({
            period: 0,
            day_week: days[dia],
            hour: inicio
          })),

          ...secondPeriod.map(({ dia, inicio }: Period) => ({
            period: 1,
            day_week: days[dia],
            hour: inicio
          })),

          ...thirdPeriod.map(({ dia, inicio }: Period) => ({
            period: 2,
            day_week: days[dia],
            hour: inicio
          }))
        ],
        subjects: [
          ...subjects.map(({ code }: { code: string }) => ({
            subject: code
          }))
        ]
      },
      'http://server-pae.azurewebsites.net/tutor/'
    );
  }
);

export const createTutorSlice = createSlice({
  name: 'createTutor',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setPasswordConfirmation: (state, action: PayloadAction<string>) => {
      state.passwordConfirmation = action.payload;
    },
    setRegisterForm: (
      state,
      action: PayloadAction<{
        name: string | null;
        email: string | null;
        major: string | null;
        password: string | null;
        passwordConfirmation: string | null;
      }>
    ) => {
      state.name = action.payload.name?.trim() ?? '';
      state.email = action.payload.email?.trim() ?? '';
      state.major = action.payload.major?.trim() ?? '';
      state.password = action.payload.password?.trim() ?? '';
      state.passwordConfirmation =
        action.payload.passwordConfirmation?.trim() ?? '';
    },
    setPeriod: (
      state,
      action: PayloadAction<{
        period: Period;
        name: string;
      }>
    ) => {
      state.schedule[`${action.payload.name}Period`] = action.payload.period;
    },
    setSubjects: (state, action: PayloadAction<Subject[]>) => {
      state.subjects = action.payload;
    },
    setDefaultValues: (state) => {
      state.name = '';
      state.email = '';
      state.major = '';
      state.password = '';
      state.passwordConfirmation = '';
      state.schedule = {
        firstPeriod: [],
        secondPeriod: [],
        thirdPeriod: []
      };
      state.subjects = [];
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerTutor.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerTutor.fulfilled, (state, action) => {
      const { status } = action.payload;
      if (status === 200 || status === 201 || status === 204) {
        state.isLoading = false;
        state.name = '';
        state.email = '';
        state.major = '';
        state.password = '';
        state.passwordConfirmation = '';
        state.schedule = {
          firstPeriod: [],
          secondPeriod: [],
          thirdPeriod: []
        };
        state.subjects = [];
      } else {
        state.error = 'Error al registrar';
        state.isLoading = false;
      }
    });
    builder.addCase(registerTutor.rejected, (state, action) => {
      state.error = action.error.message ?? 'Error';
      state.isLoading = false;
    });
  }
});

export const {
  setName,
  setEmail,
  setPassword,
  setPasswordConfirmation,
  setRegisterForm,
  setPeriod,
  setSubjects,
  setDefaultValues,
  setIsLoading
} = createTutorSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectRegisterData = (state: RootState) => ({
  name: state.createTutor.name,
  email: state.createTutor.email,
  major: state.createTutor.major,
  password: state.createTutor.password,
  passwordConfirmation: state.createTutor.passwordConfirmation
});
export const selectFirstPeriod = (state: RootState) =>
  state.createTutor.schedule.firstPeriod;
export const selectSecondPeriod = (state: RootState) =>
  state.createTutor.schedule.secondPeriod;
export const selectThirdPeriod = (state: RootState) =>
  state.createTutor.schedule.thirdPeriod;
export const selectSubjects = (state: RootState) => state.createTutor.subjects;
export const selectLoading = (state: RootState) => state.createTutor.isLoading;
export const selectError = (state: RootState) => state.createTutor.error;

export default createTutorSlice.reducer;
