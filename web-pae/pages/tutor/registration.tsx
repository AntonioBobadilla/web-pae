/* eslint-disable no-nested-ternary */
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import RegisterCalendar from '../../components/register-calendar';
import RegisterForm from '../../components/register-form';
import RegisterSubjects from '../../components/register-subjects';
import StepsRegister from '../../components/steps-register';
import styles from '../../css/tutor/registration.module.css';
import { REGISTER, SCHEDULE, Steps, SUBJECTS } from '../../helpers/steps';

const Registration: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const [step, setStep] = React.useState<string>(REGISTER);
  const [isCalendarFormComplete, setIsCalendarFormComplete] =
    React.useState<boolean>(false);
  const [isSubjectFormComplete, setIsSubjectFormComplete] =
    React.useState<boolean>(false);

  const handleSteps = (clickedStep: string | undefined | string[]) => {
    if (clickedStep === step) {
      setStep(clickedStep);
    } else if (clickedStep === REGISTER) {
      setStep(REGISTER);
      // } else if (clickedStep === SCHEDULE && isCalendarFormComplete) {
    } else if (clickedStep === SCHEDULE) {
      setStep(SCHEDULE);
    } else if (clickedStep === SUBJECTS) {
      // } else if (clickedStep === SUBJECTS && isSubjectFormComplete) {
      setStep(clickedStep);
    }
  };

  React.useEffect(() => {
    // console.log(query.step);
    handleSteps(query.step);
  }, [query]);

  const handleNextStep = () => {
    if (step === REGISTER) {
      // router
      setStep(SCHEDULE);
      router.push(`/tutor/registration/?step=${SCHEDULE}`);
    } else if (step === SCHEDULE) {
      setIsCalendarFormComplete(true);

      setIsSubjectFormComplete(true);
      router.push(`/tutor/registration/?step=${SUBJECTS}`);
      setStep(SUBJECTS);
    }
  };

  const handlePreviousStep = () => {
    if (step === SUBJECTS) {
      router.push(`/tutor/registration/?step=${SCHEDULE}`);
      setStep(SCHEDULE);
    } else if (step === SCHEDULE) {
      router.push(`/tutor/registration/?step=${REGISTER}`);
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

  const handleComponent = () => {
    switch (step) {
      case REGISTER:
        return <RegisterForm nextStep={handleNextStep} student={false} />;
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
      <StepsRegister currentRoute={query.step} />
      {handleComponent()}
    </div>
  );
};

export default Registration;
