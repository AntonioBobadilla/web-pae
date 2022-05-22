import Login from '@/pages/admin/login';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';

describe('Admin Login', () => {
  it('renders admin login page unchanged', () => {
    const { container } = render(<Login />);
    expect(container).toMatchSnapshot();
  });
});
