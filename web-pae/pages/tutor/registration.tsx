/* eslint-disable no-nested-ternary */
import type { NextPage } from 'next';
import React from 'react';
import RegisterCalendar from '../../components/register-calendar';
import RegisterForm from '../../components/register-form';
import RegisterSubjects from '../../components/register-subjects';
import StepsRegister from '../../components/steps-register';
import styles from '../../css/tutor/registration.module.css';
import { REGISTER, SCHEDULE, Steps, SUBJECTS } from '../../helpers/steps';

const Registration: NextPage = () => {
  const [step, setStep] = React.useState<string>(REGISTER);
  const [isCalendarFormComplete, setIsCalendarFormComplete] =
    React.useState<boolean>(false);
  const [isSubjectFormComplete, setIsSubjectFormComplete] =
    React.useState<boolean>(false);

  const handleNextStep = () => {
    if (step === REGISTER) {
      setStep(SCHEDULE);
    } else if (step === SCHEDULE) {
      setIsCalendarFormComplete(true);

      setIsSubjectFormComplete(true);
      setStep(SUBJECTS);
    }
  };

  const handlePreviousStep = () => {
    if (step === SUBJECTS) {
      setStep(SCHEDULE);
    } else if (step === SCHEDULE) {
      setStep(REGISTER);
    }
  };

  const steps: Steps = React.useMemo(
    () => ({
      REGISTER: {
        title: 'Datos personales'
      },
      SCHEDULE: {
        title: 'Horario'
      },
      SUBJECTS: {
        title: 'Unidades de formación'
      }
    }),
    []
  );

  const handleSteps = (clickedStep: string) => {
    if (clickedStep === step) {
      setStep(clickedStep);
    } else if (clickedStep === REGISTER) {
      setStep(REGISTER);
    } else if (clickedStep === SCHEDULE && isCalendarFormComplete) {
      setStep(SCHEDULE);
    } else if (clickedStep === SUBJECTS && isSubjectFormComplete) {
      setStep(clickedStep);
    }
  };

  const handleComponent = () => {
    switch (step) {
      case REGISTER:
        return <RegisterForm nextStep={handleNextStep} />;
      case SCHEDULE:
        return (
          <RegisterCalendar
            nextStep={handleNextStep}
            previousStep={handlePreviousStep}
          />
        );
      case SUBJECTS:
        return <RegisterSubjects previousStep={handlePreviousStep} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{steps[step].title}</h1>
      <StepsRegister handleStep={handleSteps} />
      {handleComponent()}
    </div>
  );
};

export default Registration;
