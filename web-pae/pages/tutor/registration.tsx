import type { NextPage } from 'next';
import React from 'react';
import RegisterForm from '../../components/register-form';
import StepsRegister from '../../components/steps-register';
import styles from '../../css/tutor/registration.module.css';

const registerSteps = {
  REGISTER: {
    title: 'Regístrate'
  },
  SCHEDULE: {
    title: 'Elige tu horario'
  },
  SUBJECTS: {
    title: 'Agrega tus unidades de formación'
  }
};

const Registration: NextPage = () => {
  const [step, setStep] = React.useState(registerSteps.REGISTER);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{step.title}</h1>
      <StepsRegister />
      <RegisterForm />
    </div>
  );
};

export default Registration;
