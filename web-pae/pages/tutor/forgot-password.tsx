/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { NextPage } from 'next';
import React, { useState } from 'react';
import ForgotPasswordPopup from '../../components/forgot-password-popup';
import PasswordConfirmationPopup from '../../components/password-confirmation-popup';
import styles from '../../css/student/forgot-password.module.css';

const ForgotPassword: NextPage = () => {
  const [emailSent, setEmailSent] = useState(false);

  const sendEmail = () => console.log('ij');

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        {!emailSent ? (
          <ForgotPasswordPopup setEmailSent={setEmailSent} />
        ) : (
          <PasswordConfirmationPopup />
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
