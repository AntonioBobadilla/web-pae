/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'; //traductor pagina principal
import { useState } from 'react';
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
          loginUrl="/student/login"
          registerUrl="/student/registration"
          user={0}
        />
      ) : (
        <PasswordConfirmationPopup login="/student/login" />
      )}
    </div>
  );
};


export async function getStaticProps({ locale }: { locale: any }) { //traductor pagina principal

  return {
    props: {
      ...(await serverSideTranslations(locale, ['student-forgot-password']))
    }
  };
}

export default ForgotPassword;
