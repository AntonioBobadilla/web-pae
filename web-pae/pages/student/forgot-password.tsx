/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import ButtonTemplate from '../../components/button-template';
import Popup from '../../components/popup';
import TextInput from '../../components/text-input';
import styles from '../../css/student/forgot-password.module.css';

const ForgotPassword: NextPage = () => (
  <div className={styles.container}>
    <div className={styles.background}>
      <Popup title="Recuperación de contraseña" line>
        <form className={styles.form}>
          <div className={styles.input}>
            <span className={styles.text}>Ingresa tu correo institucional</span>
            <TextInput type="text" placeholder="AXXXXXXXX@tec.mx" />
          </div>
          <div className={styles.button}>
            <ButtonTemplate text="RECUPERAR CONTRASEÑA" />
          </div>
        </form>
        <div className={styles.links}>
          <Link href="/student/login" passHref>
            <a>Login</a>
          </Link>
          <Link href="/student/login" passHref>
            <a>Registro</a>
          </Link>
        </div>
      </Popup>
    </div>
  </div>
);

export default ForgotPassword;
