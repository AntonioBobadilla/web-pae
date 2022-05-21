import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import AvailableTutorings from '../../components/available-tutorings';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import StepsStudent from '../../components/steps-student';
import TutoringQuestion from '../../components/tutoring-question';
import styles from '../../css/student/schedule-tutoring.module.css';
import {
  AVAILABLE_TUTORINGS,
  CONFIRMATION,
  SUBJECT,
  TOPIC
} from '../../helpers/student-steps';

const ScheduleTutoring: NextPage = () => {
  const [step, setStep] = React.useState<string>(SUBJECT);
  const router = useRouter();
  const { query } = router;
  const handleSteps = (clickedStep: string | undefined | string[]) => {
    if (clickedStep === step) {
      setStep(clickedStep);
    } else if (clickedStep === SUBJECT) {
      setStep(SUBJECT);
      // } else if (clickedStep === SCHEDULE && isCalendarFormComplete) {
    } else if (clickedStep === AVAILABLE_TUTORINGS) {
      setStep(AVAILABLE_TUTORINGS);
    } else if (clickedStep === TOPIC) {
      // } else if (clickedStep === SUBJECTS && isSubjectFormComplete) {
      setStep(TOPIC);
    } else if (clickedStep === CONFIRMATION) {
      setStep(CONFIRMATION);
    }
  };

  React.useEffect(() => {
    // console.log(query.step);
    handleSteps(query.step);
  }, [query]);

  const handleNextStep = () => {
    if (step === SUBJECT) {
      // router
      setStep(AVAILABLE_TUTORINGS);
      router.push(`/student/schedule-tutoring/?step=${AVAILABLE_TUTORINGS}`);
    } else if (step === AVAILABLE_TUTORINGS) {
      setStep(TOPIC);
      router.push(`/student/schedule-tutoring/?step=${TOPIC}`);
    } else if (step === TOPIC) {
      setStep(CONFIRMATION);
      router.push(`/student/schedule-tutoring/?step=${CONFIRMATION}`);
    }
  };

  const handlePreviousStep = () => {
    if (step === CONFIRMATION) {
      router.push(`/student/schedule-tutoring/?step=${TOPIC}`);
      setStep(TOPIC);
    } else if (step === TOPIC) {
      router.push(`/student/schedule-tutoring/?step=${AVAILABLE_TUTORINGS}`);
      setStep(AVAILABLE_TUTORINGS);
    } else if (step === AVAILABLE_TUTORINGS) {
      router.push(`/student/schedule-tutoring/?step=${SUBJECT}`);
      setStep(SUBJECT);
    }
  };

  const handleComponent = () => {
    // CREATE A COMPONENT FOR EACH STEP HERE, AND RETURN IT
    switch (step) {
      case SUBJECT:
        return <p>Escoger materia</p>;
      case AVAILABLE_TUTORINGS:
        return <AvailableTutorings />;
      case TOPIC:
        return <TutoringQuestion />;
      case CONFIRMATION:
        return <p>Confirmación</p>;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <StepsStudent currentRoute={query.step} />
      {handleComponent()}
    </div>
  );
};

// Add sidebar layout
ScheduleTutoring.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Agendar asesoría">{page}</SidebarLayout>;
};

export default ScheduleTutoring;
