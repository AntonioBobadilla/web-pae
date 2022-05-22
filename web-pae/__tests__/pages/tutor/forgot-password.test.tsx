import ForgotPassword from '@/pages/tutor/forgot-password';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';

describe('Tutor Forgot Password', () => {
  it('renders tutor forgot password page unchanged', () => {
    const { container } = render(<ForgotPassword />);
    expect(container).toMatchSnapshot();
  });
});
