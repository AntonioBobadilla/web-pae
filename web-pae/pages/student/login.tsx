/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import ButtonTemplate from '../../components/button-template';
import TextInput from '../../components/text-input';
//import ToggleButton from '../components/toggle-button';
//import ButtonTemplate from '../components/button-template';
//import TextInput from '../components/text-input';
import styles from '../../css/student/studentLogin.module.css';
import validator from 'validator';

const Login: NextPage = () => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const handleEmail = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmailInput(e.target.value);
  };

  const handlePassword = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPasswordInput(e.target.value);
  };

  const handleSubmit = () => {
    if (!validator.isEmpty(passwordInput) && validator.isEmail(emailInput)) {
      const obj = { email: emailInput, password: passwordInput };
      console.log(obj);
      setEmailError('');
      setPasswordError('');
    } else if (!validator.isEmail(emailInput)) {
      setEmailError('Email no válido');
      if (!validator.isEmpty(passwordInput)) {
        setPasswordError('');
      }
    }
    if (validator.isEmpty(passwordInput)) {
      setPasswordError('Por favor introduzca una contraseña');
      if (validator.isEmail(emailInput)) {
        setEmailError('');
      }
    }
  };

  return (
    <div>
      <Head>
        <title>WEB PAE</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.mainContainer}>
          <div className={styles.leftCont}>
            <img
              src="/images/student-login-image.jpg"
              className={styles.loginImage}
            />
          </div>
          <div className={styles.signIn}>
            <div className={styles.paeLogin}>
              <img src="/images/pae-logo.png" className={styles.paeLogo} />
              <h1 className={styles.paeText}> PAE | LOGIN</h1>
            </div>
            <div className={styles.line}></div>
            <div className={styles.loginFields}>
              <div className={styles.component}>
                <TextInput
                  type="email"
                  placeholder="CORREO INSTITUCIONAL"
                  handleChange={handleEmail}
                ></TextInput>
              </div>
              <div className={styles.component}>
                <TextInput
                  type="password"
                  placeholder="CONTRASEÑA"
                  handleChange={handlePassword}
                ></TextInput>
              </div>
              <div className={styles.componentB}>
                <ButtonTemplate
                  text="INICIAR SESION"
                  onClickFunction={handleSubmit}
                  color={undefined}
                ></ButtonTemplate>
              </div>
            </div>
            <div className={styles.notUser}>
              <p className={styles.emailError}>
                {emailError}
                <br></br> {passwordError}
              </p>
              <a href="#" className={styles.forgotPassword}>
                Olvidé mi contraseña
              </a>
              <h2 className={styles.register}>
                ¿No tienes cuenta?{' '}
                <a href="#" className={styles.regLink}>
                  Regístrate
                </a>
              </h2>
              <a href="#" className={styles.privacy}>
                Aviso de privacidad
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
