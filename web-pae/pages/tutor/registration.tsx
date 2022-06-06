/* eslint-disable no-nested-ternary */
import {
  registerTutor,
  selectError,
  setRegisterForm
} from '@/redux/create-tutor';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from 'store/hook';
import RegisterCalendar from '../../components/register-calendar';
import RegisterForm, {
  StudentRegisterData
} from '../../components/register-form';
import RegisterSubjects from '../../components/register-subjects';
import StepsRegister from '../../components/steps-register';
import styles from '../../css/tutor/registration.module.css';
import { REGISTER, SCHEDULE, Steps, SUBJECTS } from '../../helpers/steps';

const Registration: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();
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
  const saveData = (data: StudentRegisterData) => {
    dispatch(setRegisterForm(data));
    handleNextStep();
  };

  const handlePreviousStep = () => {
    if (step === SUBJECTS) {
      // router.push(`/tutor/registration/?step=${SCHEDULE}`);
      setStep(SCHEDULE);
    } else if (step === SCHEDULE) {
      // router.push(`/tutor/registration/?step=${REGISTER}`);
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

  const concludeRegistration = async () => {
    // dispatch(registerTutor());
    try {
      const { status } = await dispatch(registerTutor()).unwrap();
      if (status === 200 || status === 201 || status === 204) {
        toast.success('Registro exitoso. Enviando correo...');
        router.push('/tutor/register-confirmation');
      } else {
        toast.error(error);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleComponent = () => {
    switch (step) {
      case REGISTER:
        return (
          <RegisterForm
            nextStep={(data) => saveData(data)}
            student={false}
            isLoading={false}
          />
        );
      case SCHEDULE:
        return (
          <RegisterCalendar
            nextStep={handleNextStep}
            previousStep={handlePreviousStep}
          />
        );
      case SUBJECTS:
        return (
          <RegisterSubjects
            previousStep={handlePreviousStep}
            nextStep={concludeRegistration}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{steps[step].title}</h1>
      <Toaster position="top-right" reverseOrder={false} />
      <StepsRegister currentRoute={query.step} />
      {handleComponent()}
    </div>
  );
};

export default Registration;
