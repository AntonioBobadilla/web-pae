/* eslint-disable no-param-reassign */
import { AvailableTutoring, Meeting } from '@/components/data-table/types';
import { Subject } from '@/components/search-bar';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface Tutor {
  id: string | null;
  name: string | null;
}

interface ScheduleTutoringState {
  subject: Subject | null;
  tutor: string | null;
  date: string;
  time: string | null;
  hour: number | null;
  isOnline: boolean;
  title: string;
  content: string;
  file: File | null;
  modalidad: string | null;
  availableTutorings: Meeting[];
  filteredMeetings: AvailableTutoring[];
  isLoading: boolean;
  selectedItem: AvailableTutoring;
}

// Define the initial state using that type
const initialState: ScheduleTutoringState = {
  subject: null,
  tutor: '',
  date: '',
  time: '',
  modalidad: '',
  hour: null,
  isOnline: false,
  title: '',
  content: '',
  file: null,
  availableTutorings: [],
  filteredMeetings: [],
  isLoading: false,
  selectedItem: {
    isOnline: false,
    period: 0,
    hour: 0,
    tutor: ''
  }
};

export const getAvailableTutorings = createAsyncThunk(
  'schedule-tutoring/available-tutorings',
  async (arg, thunkAPI) => {
    const { getState } = thunkAPI;
    const {
      scheduleTutoring: { subject }
    } = getState();

    const date = new Date();

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
      }).then((res) => res.json());

    return post(
      {
        subject: subject.code,
        initial_date_serializer: `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate() + 1}`,
        final_date_serializer: `${date.getFullYear()}-${date.getMonth() + 1}-${
          date.getDate() + 15
        }`
      },
      'http://server-pae.azurewebsites.net/availabletutoring/'
    );
  }
);

export const reserveTutoring = createAsyncThunk(
  'schedule-tutoring/reserve-tutoring',
  async (arg, thunkAPI) => {
    const { getState } = thunkAPI;
    const {
      scheduleTutoring: {
        tutor,
        date,
        hour,
        subject,
        modalidad,
        title,
        content,
        file,
        isOnline
      },
      user: { token, id }
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
      }).then((res) => res.json());

    return post(
      {
        tutor,
        student: id,
        subject: subject.code,
        date,
        hour,
        is_online: isOnline,
        topic: title,
        doubt: content,
        file
      },
      'http://server-pae.azurewebsites.net/tutoring/'
    );
  }
);

export const scheduleTutoringSlice = createSlice({
  name: 'scheduleTutoring',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSubject: (state, action: PayloadAction<Subject>) => {
      state.subject = action.payload;
    },
    setTutor: (state, action: PayloadAction<string>) => {
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
    setFile: (state, action: PayloadAction<File>) => {
      state.file = action.payload;
    },
    setModalidad: (state, action: PayloadAction<string>) => {
      state.modalidad = action.payload;
    },
    setFilteredMeetings: (
      state,
      action: PayloadAction<AvailableTutoring[]>
    ) => {
      state.filteredMeetings = action.payload;
    },
    setSelectedItem: (state, action: PayloadAction<AvailableTutoring>) => {
      state.selectedItem = action.payload;
    },

    reset: (state) => {
      state.subject = null;
      state.tutor = null;
      state.date = '';
      state.time = null;
      state.title = '';
      state.content = '';
      state.file = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAvailableTutorings.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAvailableTutorings.fulfilled, (state, action) => {
      // const { status } = action.payload;
      state.isLoading = false;
      if (action.payload && action.payload.length > 0) {
        state.availableTutorings = action.payload;
      } else {
        state.availableTutorings = [];
      }
      // console.log(status, action.payload);
      // const response = action.payload;
      // if (status === 200 || status === 201 || status === 204) {
      //   // response.json().then((data) => {
      //   //   state.availableTutorings = data;
      //   state.availableTutorings = response.json();
      //   state.isLoading = false;
      //   // });
      // } else {
      //   state.isLoading = false;
      // }
    });
    builder.addCase(getAvailableTutorings.rejected, (state, action) => {
      state.availableTutorings = [];
      state.isLoading = false;
    });

    builder.addCase(reserveTutoring.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(reserveTutoring.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(reserveTutoring.rejected, (state, action) => {
      state.isLoading = false;
    });
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
  setModalidad,
  reset,
  setFilteredMeetings,
  setSelectedItem
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
export const selectAvailableTutorings = (state: RootState) =>
  state.scheduleTutoring.availableTutorings;
export const selectFilteredMeetings = (state: RootState) =>
  state.scheduleTutoring.filteredMeetings;
export const selectSelectedItem = (state: RootState) =>
  state.scheduleTutoring.selectedItem;

export default scheduleTutoringSlice.reducer;
