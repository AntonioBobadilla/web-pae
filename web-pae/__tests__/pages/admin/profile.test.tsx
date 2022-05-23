import Profile from '@/pages/admin/profile';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';

describe('Admin Profile', () => {
  it('renders admin profile page unchanged', () => {
    const { container } = render(<Profile />);
    expect(container).toMatchSnapshot();
  });
});
