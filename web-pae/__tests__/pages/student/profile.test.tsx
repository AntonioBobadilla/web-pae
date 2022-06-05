import Profile from '@/pages/student/profile';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';

describe('Student Profile', () => {
  it('renders admin profile page unchanged', () => {
    const { container } = render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
