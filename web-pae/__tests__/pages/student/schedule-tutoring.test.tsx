import AvailableTutorings from '@/components/available-tutorings';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
// import With

describe('Schedule Tutoring', () => {
  beforeEach(() => {
    render(<AvailableTutorings />);
  });
  // TODO: fix this test
  // it('renders tutor registration page unchanged', () => {
  //   const { container } = render(<Registration />);
  //   expect(container).toMatchSnapshot();
  // });
  it('should be disabled', () => {
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});
