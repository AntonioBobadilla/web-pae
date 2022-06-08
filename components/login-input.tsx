import React from 'react';
import { Control, FieldError, UseControllerProps } from 'react-hook-form';
import TextInput from './text-input';

export type LoginData = {
  email: string;
  password: string;
};

export const loginDefaultValues: LoginData = {
  email: '',
  password: ''
};

interface LoginInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: 'email' | 'password';
  error: FieldError | undefined;
  control: Control<LoginData>;
  rules: UseControllerProps['rules'];
}

const LoginInput = (props: LoginInputProps) => <TextInput {...props} />;

export default LoginInput;
