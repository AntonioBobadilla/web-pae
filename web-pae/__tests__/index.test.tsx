import Home from '@/pages/index';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';

describe('Index', () => {
  it('renders index page unchanged', () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
