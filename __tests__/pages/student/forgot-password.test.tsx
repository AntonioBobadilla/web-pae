import ForgotPassword from '@/pages/student/forgot-password';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';

describe('Student Forgot Password', () => {
  it('renders student forgot password page unchanged', () => {
    const { container } = render(<ForgotPassword />);
    expect(container).toMatchSnapshot();
  });
});
