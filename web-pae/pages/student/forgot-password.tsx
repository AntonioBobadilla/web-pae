/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { NextPage } from 'next';
import React, { useState } from 'react';
import ForgotPasswordPopup from '../../components/forgot-password-popup';
import PasswordConfirmationPopup from '../../components/password-confirmation-popup';
import styles from '../../css/student/forgot-password.module.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ForgotPassword: NextPage = () => {
  const [emailSent, setEmailSent] = useState(false);

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

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'footer']))
    }
  };
}

export default ForgotPassword;
