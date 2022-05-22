/* eslint-disable no-nested-ternary */
import cx from 'classnames';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import RegisterForm from '../../components/register-form';
import styles2 from '../../css/components/popup.module.css';
import styles from '../../css/tutor/registration.module.css';
import register from '../../helpers/register';

const Registration: NextPage = () => {
  const { push } = useRouter();

  const handleNextStep = async (data: any) => {
    // console.log(data)
    register(
      {
        user: {
          password: data.password,
          confirm_password: data.passwordConfirmation
        },
        email: data.email,
        name: data.name
      },
      'http://server-pae.azurewebsites.net/tutee/'
    ).then(({ auth, message }) => {
      if (auth) {
        push('/student/register-confirmation');
      } else {
        alert(message);
      }
    });
  };

  return (
    <div className={cx(styles.container, styles2.containerPopup)}>
      <h1 className={styles.title}>REGISTRO</h1>
      <h2 className={styles.subtitle}>Datos personales</h2>

      <RegisterForm nextStep={(data) => handleNextStep(data)} student />
    </div>
  );
};

export default Registration;
