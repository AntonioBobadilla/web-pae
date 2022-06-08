import Register from '@/pages/register';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';

describe('Register', () => {
  it('renders register page unchanged', () => {
    const { container } = render(<Register />);
    expect(container).toMatchSnapshot();
  });
});
