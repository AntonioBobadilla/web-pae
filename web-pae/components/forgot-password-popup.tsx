/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import React from 'react';
import styles from '../css/components/forgot-password-popup.module.css';
import ButtonTemplate from './button-template';
import Popup from './popup';
import TextInput from './text-input';

interface ForgotPasswordPopupProps {
  handleEmail: (e: { target: { value: string } }) => void;
  handleSubmit: () => void;
  emailError: string;
}

const ForgotPasswordPopup = (props: ForgotPasswordPopupProps) => {
  const { handleEmail, handleSubmit, emailError } = props;

  return (
    <Popup title="Recuperación de contraseña" line>
      <form className={styles.form}>
        <div className={styles.input}>
          <span className={styles.text}>Ingresa tu correo institucional</span>
          <TextInput
            type="text"
            placeholder="AXXXXXXXX@tec.mx"
            handleChange={(e) => handleEmail(e)}
          />
          {{ emailError } && <span className="error">{emailError}</span>}
        </div>
        <div className={styles.button}>
          <ButtonTemplate
            text="RECUPERAR CONTRASEÑA"
            color="#039BE5"
            onClickFunction={() => handleSubmit()}
          />
        </div>
      </form>
      <div className={styles.links}>
        <Link href="/student/login" passHref>
          <a>Login</a>
        </Link>
        <Link href="/student/register" passHref>
          <a>Registro</a>
        </Link>
      </div>
    </Popup>
  );
};

export default ForgotPasswordPopup;
