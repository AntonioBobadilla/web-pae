import Home from '@/pages/admin/home';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';

describe('Admin Home', () => {
  it('renders admin home page unchanged', () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
