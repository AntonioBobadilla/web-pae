/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { NextPage } from 'next';
import React, { useState } from 'react';
import ForgotPasswordPopup from '../../components/forgot-password-popup';
import PasswordConfirmationPopup from '../../components/password-confirmation-popup';
import styles from '../../css/student/forgot-password.module.css';

const ForgotPassword: NextPage = () => {
  const [emailSent, setEmailSent] = useState(false);

  return (
    <div className={styles.container}>
      {!emailSent ? (
        <ForgotPasswordPopup
          setEmailSent={setEmailSent}
          loginUrl="/admin/login"
          registerUrl="/admin/login"
          user={2}
        />
      ) : (
        <PasswordConfirmationPopup login="/admin/login" />
      )}
    </div>
  );
};

export default ForgotPassword;
