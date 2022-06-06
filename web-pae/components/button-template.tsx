/* eslint-disable react/button-has-type */
import cx from 'classnames';
import React from 'react';
import ButtonTemplateStyles from '../css/components/buttonTemplate.module.css';

interface ButtonTemplateProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: string;
  loading?: boolean;
  clickable?: boolean;
}

interface Variant {
  [key: string]: string;
}

const variants: Variant = {
  primary: ButtonTemplateStyles.primary,
  secondary: ButtonTemplateStyles.secondary,
  confirm: ButtonTemplateStyles.confirm,
  cancel: ButtonTemplateStyles.cancel,
  info: ButtonTemplateStyles.info,
  pending: ButtonTemplateStyles.pending
};

// creo un Stateless Functional Component
const ButtonTemplate = ({
  variant,
  loading,
  children,
  clickable,
  ...rest
}: ButtonTemplateProps) => (
  <button
    {...rest}
    className={cx(
      ButtonTemplateStyles.container,
      clickable && ButtonTemplateStyles.button,
      variants[variant],
      rest.className
    )}
  >
    {loading && <div className={ButtonTemplateStyles.spinner} />}
    {children}
  </button>
);

ButtonTemplate.defaultProps = {
  loading: false,
  clickable: true
};

export default ButtonTemplate;
