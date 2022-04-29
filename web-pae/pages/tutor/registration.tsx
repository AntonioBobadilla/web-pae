import type { NextPage } from 'next';
import React from 'react';
import RegisterCalendar from '../../components/register-calendar';
import RegisterForm from '../../components/register-form';
import RegisterSubjects from '../../components/register-subjects';
import StepsRegister from '../../components/steps-register';
import styles from '../../css/tutor/registration.module.css';
import registerSteps from '../../helpers/steps';

const Registration: NextPage = () => {
  const [step, setStep] = React.useState(registerSteps.REGISTER);

  const handleNextStep = () => {
    if (step === registerSteps.REGISTER) {
      setStep(registerSteps.SCHEDULE);
    } else if (step === registerSteps.SCHEDULE) {
      setStep(registerSteps.SUBJECTS);
    }
  };

  const handlePreviousStep = () => {
    if (step === registerSteps.SUBJECTS) {
      setStep(registerSteps.SCHEDULE);
    } else if (step === registerSteps.SCHEDULE) {
      setStep(registerSteps.REGISTER);
    }
  };

  const handleComponent = () => {
    if (step === registerSteps.REGISTER) {
      return <RegisterForm setStep={setStep} />;
    }
    if (step === registerSteps.SCHEDULE) {
      return <RegisterCalendar setStep={setStep} />;
    }
    if (step === registerSteps.SUBJECTS) {
      return <RegisterSubjects setStep={setStep} />;
    }

    return <div>No hay componente</div>;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{step.title}</h1>
      <StepsRegister setStep={setStep} />
      {handleComponent()}
    </div>
  );
};

export default Registration;
