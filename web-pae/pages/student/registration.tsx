/* eslint-disable no-nested-ternary */
import cx from 'classnames';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import RegisterForm from '../../components/register-form';
import styles2 from '../../css/components/popup.module.css';
import styles from '../../css/tutor/registration.module.css';

const Registration: NextPage = () => {
  const router = useRouter();

  const handleNextStep = () => {
    router.push('/tutor/register-confirmation');
  };

  return (
    <div className={cx(styles.container, styles2.containerPopup)}>
      <h1 className={styles.title}>REGISTRO</h1>
      <h2 className={styles.subtitle}>Datos personales</h2>

      <RegisterForm nextStep={handleNextStep} student />
    </div>
  );
};

export default Registration;
