import RegisterConfirmation from '@/pages/tutor/register-confirmation';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';

describe('Tutor Register Confirmation', () => {
  it('renders tutor register confirmation page unchanged', () => {
    const { container } = render(<RegisterConfirmation />);
    expect(container).toMatchSnapshot();
  });
});
