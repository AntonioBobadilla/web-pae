import LoginForm from '@/components/login-form';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';

describe('Tutor Login', () => {
  it('renders tutor login page unchanged', () => {
    const { container } = render(
      <Provider store={store}>
        <LoginForm
          image="/images/tutor-login-image.jpg"
          homeRoute="/tutor/home"
          user="tutor"
          forgotPasswordRoute="/tutor/forgot-password"
        />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
