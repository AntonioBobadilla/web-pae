import TutoringQuestion from '@/components/tutoring/question';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
// import With

describe('Schedule Tutoring', () => {
  // beforeEach(() => {
  //   render(< />);
  // });
  // TODO: fix this test
  it('renders tutor registration page unchanged', () => {
    const { container } = render(<TutoringQuestion />);
    expect(container).toMatchSnapshot();
  });
  // it('should be disabled', () => {
  //   expect(screen.getByRole('')).toBeInTheDocument();
  // });
});
