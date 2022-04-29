/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import validator from 'validator';
import ForgotPasswordPopup from '../../components/forgot-password-popup';
import PasswordConfirmationPopup from '../../components/password-confirmation-popup';
import styles from '../../css/student/forgot-password.module.css';

const ForgotPassword: NextPage = () => {
  const [emailInput, setEmailInput] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();
  //   const { data, error, isPending } = useFetch(
  //     'http://localhost:3000/api/forgot-password'
  //   );
  const handleEmail = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmailInput(e.target.value);
  };

  const handleSubmit = () => {
    if (validator.isEmail(emailInput)) {
      setEmailError('');
      const obj = { email: emailInput };
      //   console.log(obj);
      // fetch('http://localhost:3000/api/forgot-password', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(obj),
      // })
      //   .then(res => res.json())
      //   .then(data => {
      //     console.log(data);
      //   })
      //   .catch(err => console.log(err));
      //   router.push('/student/forgot-password');
      setEmailSent(true);
    } else {
      setEmailError('Email no valido');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        {!emailSent ? (
          <ForgotPasswordPopup
            handleEmail={handleEmail}
            handleSubmit={handleSubmit}
            emailError={emailError}
          />
        ) : (
          <PasswordConfirmationPopup />
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
