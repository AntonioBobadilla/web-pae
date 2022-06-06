import LoginForm from '@/components/login-form';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';

describe('Student Login', () => {
  it('renders tutor login page unchanged', () => {
    const { container } = render(
      <Provider store={store}>
        <LoginForm
          image="/images/student-login-image.jpg"
          homeRoute="/student/home"
          user="student"
          forgotPasswordRoute="/student/forgot-password"
        />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  // it('should display matching error when email is invalid', async () => {
  //   fireEvent.input(screen.getByRole('textbox', { description: 'name' }), {
  //     target: {
  //       value: 'test'
  //     }
  //   });

  //   fireEvent.input(screen.getByRole('textbox', { name: /password/i }), {
  //     target: {
  //       value: 'test'
  //     }
  //   });

  //   fireEvent.submit(screen.getByRole('button'));

  //   expect(screen.getByRole('textbox', { name: /email/i }).value).toBe('test');
  // });
});
