import RegisterForm from '@/components/register-form';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('Tutor registration', () => {
  beforeEach(() => {
    render(<RegisterForm nextStep={() => console.log('ok')} student={false} />);
  });
  // TODO: fix this test
  // it('renders tutor registration page unchanged', () => {
  //   const { container } = render(<Registration />);
  //   expect(container).toMatchSnapshot();
  // });
  it('should be disabled', () => {
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
