import TutoringConfirmation from '@/components/tutoring/confirmation';
import TutoringSubject from '@/components/tutoring/subject';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import StepsStudent from '../../components/steps-student';
import AvailableTutorings from '../../components/tutoring/available-tutorings';
import TutoringQuestion from '../../components/tutoring/question';
import styles from '../../css/student/schedule-tutoring.module.css';
import {
  AVAILABLE_TUTORINGS,
  CONFIRMATION,
  SUBJECT,
  TOPIC
} from '../../helpers/student-steps';

const ScheduleTutoring: NextPage = () => {
  const [step, setStep] = React.useState<string>(SUBJECT);
  const { query, push } = useRouter();
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
      push(`/student/schedule-tutoring/?step=${AVAILABLE_TUTORINGS}`);
    } else if (step === AVAILABLE_TUTORINGS) {
      setStep(TOPIC);
      push(`/student/schedule-tutoring/?step=${TOPIC}`);
    } else if (step === TOPIC) {
      setStep(CONFIRMATION);
      push(`/student/schedule-tutoring/?step=${CONFIRMATION}`);
    }
  };

  const handlePreviousStep = () => {
    if (step === CONFIRMATION) {
      push(`/student/schedule-tutoring/?step=${TOPIC}`);
      setStep(TOPIC);
    } else if (step === TOPIC) {
      push(`/student/schedule-tutoring/?step=${AVAILABLE_TUTORINGS}`);
      setStep(AVAILABLE_TUTORINGS);
    } else if (step === AVAILABLE_TUTORINGS) {
      push(`/student/schedule-tutoring/?step=${SUBJECT}`);
      setStep(SUBJECT);
    }
  };

  const handleComponent = () => {
    // CREATE A COMPONENT FOR EACH STEP HERE, AND RETURN IT
    switch (step) {
      case SUBJECT:
        return <TutoringSubject />;
      case AVAILABLE_TUTORINGS:
        return <AvailableTutorings />;
      case TOPIC:
        return <TutoringQuestion />;
      case CONFIRMATION:
        return <TutoringConfirmation />;
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
