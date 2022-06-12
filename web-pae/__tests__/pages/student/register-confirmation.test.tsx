import RegisterConfirmation from '@/pages/student/register-confirmation';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';

describe('Student Register Confirmation', () => {
  it('renders student register confirmation unchanged', () => {
    const { container } = render(<RegisterConfirmation />);
    expect(container).toMatchSnapshot();
  });
});
