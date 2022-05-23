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

// const fetchSubjects = createAsyncThunk(
//   'subjects',
//   async (query: string, thunkAPI) =>
//     // const response = await userAPI.fetchSubjects(query);
//     1
// );

interface Period {
  start: string | null;
  end: string | null;
}

// interface SetPeriod {
//   period: Period;
//   name: string;
// }
// Define a type for the slice state
interface CreateTutorState {
  name: string | null;
  email: string | null;
  password: string | null;
  passwordConfirmation: string | null;
  schedule: {
    firstPeriod: Period[];
    secondPeriod: Period[];
    thirdPeriod: Period[];
  };
  subjects: string[] | null;
}

// Define the initial state using that type
const initialState: CreateTutorState = {
  name: null,
  email: null,
  password: null,
  passwordConfirmation: null,
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
    }
    // setPeriod: (state, action: PayloadAction<SetPeriod>) => {
    //   state.schedule[`${action.payload.name}Period`] = action.payload.period;
    // }
  }
});

export const { setName, setEmail, setPassword, setPasswordConfirmation } =
  createTutorSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectName = (state: RootState) => state.createTutor.name;

export default createTutorSlice.reducer;
