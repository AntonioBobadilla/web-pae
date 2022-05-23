import Tutorings from '@/pages/admin/tutorings';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';

describe('Tutorings', () => {
  it('renders tutorings page unchanged', () => {
    const { container } = render(<Tutorings />);
    expect(container).toMatchSnapshot();
  });
});
