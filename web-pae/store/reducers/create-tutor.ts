/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// const userAPI = () => {
//   fetchSubjects: () => Promise<string[]>;
// }

// export const fetchSubject = (id: any): AppThunk => async dispatch => {
//     const timeoutPromise = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout));

//     await timeoutPromise(200);

//     dispatch(
//         subjectSlice.actions.setEnt({
//             [id]: {
//                 id,
//                 name: `Subject ${id}`,
//             },
//         }),
//     );
// };

// export const register = createAsyncThunk();

// const fetchSubjects = createAsyncThunk(
//   'subjects',
//   async (query: string, thunkAPI) =>
//     // const response = await userAPI.fetchSubjects(query);
//     1
// );

interface Period {
  dia: string;
  inicio: number;
  fin: number;
  id: string;
  cell: any;
}

// interface SetPeriod {
//   period: Period;
//   name: string;
// }
// Define a type for the slice state
interface CreateTutorState {
  name: string;
  email: string;
  major: string;
  password: string;
  passwordConfirmation: string;
  schedule: {
    firstPeriod: Period[];
    secondPeriod: Period[];
    thirdPeriod: Period[];
  };
  subjects: string[];
}

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
  subjects: []
};

export const createTutorSlice = createSlice({
  name: 'creatreTutor',
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
    setSubjects: (state, action: PayloadAction<string[]>) => {
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
    }
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
  setDefaultValues
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

export default createTutorSlice.reducer;
