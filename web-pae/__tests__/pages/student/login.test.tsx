import Login from '@/pages/student/login';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';

describe('Student Login', () => {
  beforeEach(() => {
    render(<Login />);
  });

  it('renders page unchanged', () => {
    const { container } = render(<Login />);
    expect(container).toMatchSnapshot();
  });

  // it('should display matching error when email is invalid', async () => {
  //   fireEvent.input(screen.getByRole('textbox', { description: 'name' }), {
  //     target: {
  //       value: 'test'
  //     }
  //   });

  //   fireEvent.input(screen.getByRole('textbox', { name: /password/i }), {
  //     target: {
  //       value: 'test'
  //     }
  //   });

  //   fireEvent.submit(screen.getByRole('button'));

  //   expect(screen.getByRole('textbox', { name: /email/i }).value).toBe('test');
  // });
});
