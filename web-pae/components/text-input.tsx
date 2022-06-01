/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cx from 'classnames';
import React from 'react';
import {
  Control,
  Controller,
  FieldError,
  UseControllerProps
} from 'react-hook-form';
import TextInputStyles from '../css/components/textInput.module.css';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error: FieldError | undefined;
  control: Control<any>;
  rules: UseControllerProps['rules'];
}

export interface RenderProps {
  field: any;
  fieldState: any;
}

const TextInput = ({
  name,
  error,
  control,
  rules,
  style,
  ...rest
}: TextInputProps) => (
  <>
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }: RenderProps) => (
        <input
          {...rest}
          id={field.name}
          {...field}
          style={
            fieldState.error
              ? { border: '1px solid red', ...style }
              : { ...style }
          }
          className={cx(TextInputStyles.textInput, rest.className)}
        />
      )}
    />
    {error && <p className="error">{error.message}</p>}
  </>
);
export default TextInput;
