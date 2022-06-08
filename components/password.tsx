/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cx from 'classnames';
import React from 'react';
import { Controller } from 'react-hook-form';
import TextInputStyles from '../css/components/textInput.module.css';
import Transition from './dialogs/transition';
import PasswordMeter from './password-meter';
import { RenderProps, TextInputProps } from './text-input';

const Password = ({
  name,
  error,
  control,
  rules,
  style,
  ...rest
}: TextInputProps) => {
  const [showPasswordMeter, setShowPasswordMeter] = React.useState(false);
  const dialogRef = React.useRef(null);
  const inputRef = React.useRef(null);

  const onExited = () => {
    setShowPasswordMeter(false);
  };

  const onFocus = () => {
    setShowPasswordMeter(true);
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }: RenderProps) => (
          <>
            {showPasswordMeter && (
              <Transition
                nodeRef={dialogRef}
                onExited={onExited}
                location={showPasswordMeter}
              >
                <PasswordMeter reference={dialogRef} password={field.value} />
              </Transition>
            )}

            <input
              type="password"
              placeholder="CONTRASEÑA*"
              ref={inputRef}
              {...rest}
              id={field.name}
              {...field}
              style={
                fieldState.error
                  ? { border: '1px solid red', ...style }
                  : { ...style }
              }
              className={cx(TextInputStyles.textInput, rest.className)}
              onFocus={onFocus}
              onBlur={() => setShowPasswordMeter(false)}
            />
          </>
        )}
      />
      {error && <p className="error">{error.message}</p>}
    </>
  );
};
export default Password;
