import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { Action } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import user from './reducers/user';
import scheduleTutoring from './reducers/schedule-tutoring';
import createTutor from './reducers/create-tutor';

// middleware
const middleware = [thunk];

// creating store

export const store = configureStore({
  reducer: {
    user,
    scheduleTutoring,
    createTutor
  },
  middleware
});

// assigning store to next wrapper
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);