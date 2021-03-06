/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { NextPage } from 'next';
import React from 'react';
import ConfirmationPopup from '../../components/confirm-popup';
import styles from '../../css/student/forgot-password.module.css';

const RegisterConfirmation: NextPage = () => (
  <div className={styles.container}>
    <div className={styles.background}>
      <ConfirmationPopup url="/student/login" />
    </div>
  </div>
);

export default RegisterConfirmation;
