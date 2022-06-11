/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import { AvailableTutoring, Meeting } from '@/components/data-table/types';
import { Subject } from '@/components/search-bar';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

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
  subject: {
    name: '',
    code: '',
    semester: 0
  },
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
    } = getState() as RootState;

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
        subject: subject?.code || '',
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
    const state: RootState = getState() as RootState;

    const {
      scheduleTutoring: { date, subject, title, content, file, selectedItem },
      user: { token, id }
    } = state;

    const formData = new FormData();

    formData.append('subject_id', subject?.code || '');
    formData.append('student', id || '');
    formData.append('tutor_id', selectedItem.tutor);
    formData.append('date', date);
    formData.append('hour', selectedItem.hour.toString());
    formData.append('is_online', selectedItem.isOnline.valueOf().toString());
    formData.append('topic', title);
    formData.append('doubt', content);
    if (file !== null) {
      formData.append('file', file);
    }

    formData.append('place', 'Zoom');

    const post = (data: any, url: string) =>
      fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`
        },
        body: data,
        cache: 'no-cache',
        credentials: 'same-origin'
        // mode: 'cors'
      });

    return post(formData, 'http://server-pae.azurewebsites.net/tutoring/');
  }
);

export const scheduleTutoringSlice = createSlice({
  name: 'scheduleTutoring',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSubject: (state, action: PayloadAction<Subject | null>) => {
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
      state.tutor = '';
      state.date = '';
      state.time = '';
      state.hour = null;
      state.isOnline = false;
      state.title = '';
      state.content = '';
      state.file = null;
      state.modalidad = '';
      state.availableTutorings = [];
      state.filteredMeetings = [];
      state.isLoading = false;
      state.selectedItem = {
        isOnline: false,
        period: 0,
        hour: 0,
        tutor: ''
      };
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
    builder.addCase(getAvailableTutorings.rejected, (state) => {
      state.availableTutorings = [];
      state.isLoading = false;
    });

    builder.addCase(reserveTutoring.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(reserveTutoring.fulfilled, (state, action) => {
      const { status } = action.payload;

      if (status === 200 || status === 201 || status === 204) {
        state.isLoading = false;
      } else {
        state.isLoading = false;
      }
    });
    builder.addCase(reserveTutoring.rejected, (state) => {
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
export const selectIsLoading = (state: RootState) =>
  state.scheduleTutoring.isLoading;

export default scheduleTutoringSlice.reducer;
