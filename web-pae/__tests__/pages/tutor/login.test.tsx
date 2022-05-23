import Login from '@/pages/tutor/login';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';

describe('Tutor Login', () => {
  it('renders tutor login page unchanged', () => {
    const { container } = render(<Login />);
    expect(container).toMatchSnapshot();
  });
});
