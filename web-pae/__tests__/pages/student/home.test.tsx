import Home from '@/pages/student/home';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';

describe('Student Home', () => {
  it('renders Student home page unchanged', () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
