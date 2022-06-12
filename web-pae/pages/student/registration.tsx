/* eslint-disable no-nested-ternary */
import cx from 'classnames';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import RegisterForm, {
  StudentRegisterData
} from '../../components/register-form';
import styles2 from '../../css/components/popup.module.css';
import styles from '../../css/tutor/registration.module.css';
import register from '../../helpers/student-register';

const Registration: NextPage = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleStatus = (status: number, responseData: any) => {
    try {
      if (status === 200 || status === 201 || status === 204) {
        // toast success
        toast.success(responseData.message);

        // redirect to home
        setTimeout(() => push('/student/login'), 500);
      } else {
        // toast error
        toast.error(responseData.message);

        // set error state
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      toast.error('Something went wrong');
    }
  };

  const handleNextStep = async (data: StudentRegisterData) => {
    setIsLoading(true);
    register({
      user: {
        password: data.password,
        confirm_password: data.passwordConfirmation
      },
      email: data.email,
      name: data.name,
      major: data.major
    })
      .then(({ status, responseData }) => {
        handleStatus(status, responseData);
      })
      .catch((err) => {
        handleStatus(500, err);
      });
  };

  return (
    <div className={cx(styles.container, styles2.containerPopup)}>
      <h1 className={styles.title}>REGISTRO</h1>
      <h2 className={styles.subtitle}>Datos personales</h2>

      <RegisterForm
        nextStep={(data) => handleNextStep(data)}
        student
        isLoading={isLoading}
      />
    </div>
  );
};

export default Registration;
