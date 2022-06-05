import Profile from '@/pages/tutor/profile';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';

describe('Tutor Profile', () => {
  it('renders tutor profile page unchanged', () => {
    const { container } = render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
