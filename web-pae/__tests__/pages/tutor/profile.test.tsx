import Profile from '@/pages/tutor/profile';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';

describe('Tutor Profile', () => {
  it('renders tutor profile page unchanged', () => {
    const { container } = render(<Profile />);
    expect(container).toMatchSnapshot();
  });
});
