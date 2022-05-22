import AssignedTutorings from '@/pages/tutor/assigned-tutorings';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';

describe('Assigned Tutorings', () => {
  it('renders assigned tutorings page unchanged', () => {
    const { container } = render(<AssignedTutorings />);
    expect(container).toMatchSnapshot();
  });
});
