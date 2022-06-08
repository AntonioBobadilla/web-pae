import LoginFormAdmin from '@/components/login-form-admin';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';

describe('Admin Login', () => {
  it('renders admin login page unchanged', () => {
    const { container } = render(
      <Provider store={store}>
        <LoginFormAdmin
          image="/images/admin-login-image.jpg"
          homeRoute="/admin/home"
          user="admin"
          forgotPasswordRoute="/admin/forgot-password"
        />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
