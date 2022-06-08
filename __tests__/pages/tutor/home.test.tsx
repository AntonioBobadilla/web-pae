import Home from '@/pages/tutor/home';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';

describe('Tutor Home Profile', () => {
  it('renders tutor home  page unchanged', () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
