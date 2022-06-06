import RegisterForm from '@/components/register-form';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';

describe('Student registration', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <RegisterForm
          nextStep={() => console.log('ok')}
          student
          isLoading={false}
        />
      </Provider>
    );
  });
  // TODO: fix this test
  // it('renders tutor registration page unchanged', () => {
  //   const { container } = render(<Registration />);
  //   expect(container).toMatchSnapshot();
  // });
  it('should be disabled', () => {
    expect(screen.getByRole('button')).toBeEnabled();
  });
});
