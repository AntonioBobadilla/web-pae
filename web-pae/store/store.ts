import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { Action } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import createTutor from './reducers/create-tutor';
import scheduleTutoring from './reducers/schedule-tutoring';
import user from './reducers/user';

const saveToLocalStorage = (state: RootState) => {
  try {
    localStorage.setItem('state', JSON.stringify(state));
  } catch (e) {
    // console.error(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem('state');
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    // console.error(e);
    return undefined;
  }
};

const persistedStore = loadFromLocalStorage();

// middleware
const middleware = [thunk];

// creating store

export const store = configureStore({
  reducer: {
    user,
    scheduleTutoring,
    createTutor
  },
  middleware,
  preloadedState: persistedStore
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
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
