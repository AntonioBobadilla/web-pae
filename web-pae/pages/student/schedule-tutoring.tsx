import TutoringConfirmation from '@/components/tutoring/confirmation';
import TutoringSubject from '@/components/tutoring/subject';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement, useState } from 'react';
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
  const [isSubjectComplete, setIsSubjectComplete] = useState(true);
  const [isAvailableTutoringsComplete, setIsAvailableTutoringsComplete] =
    useState(false);
  const [isTopicComplete, setIsTopicComplete] = useState(false);
  const [isConfirmationComplete, setIsConfirmationComplete] = useState(false);

  const handleSteps = (clickedStep: string | undefined | string[]) => {
    let newStep = step;
    if (clickedStep === step) {
      newStep = clickedStep;
      setStep(clickedStep);
    } else if (clickedStep === SUBJECT) {
      newStep = SUBJECT;
      setStep(SUBJECT);
    } else if (
      clickedStep === AVAILABLE_TUTORINGS &&
      isAvailableTutoringsComplete
    ) {
      newStep = AVAILABLE_TUTORINGS;
      setStep(AVAILABLE_TUTORINGS);
    } else if (clickedStep === TOPIC && isTopicComplete) {
      newStep = TOPIC;
      setStep(TOPIC);
    } else if (clickedStep === CONFIRMATION && isConfirmationComplete) {
      newStep = CONFIRMATION;
      setStep(CONFIRMATION);
    }

    const href = {
      pathname: '/student/schedule-tutoring',
      query: { step: newStep }
    };
    push(href);
  };

  React.useEffect(() => {
    // console.log(query.step);
    handleSteps(query.step);
  }, []);

  const handleNextStep = () => {
    if (step === SUBJECT) {
      // router
      setIsAvailableTutoringsComplete(true);
      setStep(AVAILABLE_TUTORINGS);
      push(`/student/schedule-tutoring/?step=${AVAILABLE_TUTORINGS}`);
    } else if (step === AVAILABLE_TUTORINGS) {
      setIsTopicComplete(true);
      setStep(TOPIC);
      push(`/student/schedule-tutoring/?step=${TOPIC}`);
    } else if (step === TOPIC) {
      setIsConfirmationComplete(true);
      setStep(CONFIRMATION);
      push(`/student/schedule-tutoring/?step=${CONFIRMATION}`);
    }
  };

  const handleComponent = () => {
    // CREATE A COMPONENT FOR EACH STEP HERE, AND RETURN IT
    switch (step) {
      case SUBJECT:
        return <TutoringSubject handleNextStep={handleNextStep} />;
      case AVAILABLE_TUTORINGS:
        return <AvailableTutorings handleNextStep={handleNextStep} />;
      case TOPIC:
        return <TutoringQuestion handleNextStep={handleNextStep} />;
      case CONFIRMATION:
        return <TutoringConfirmation />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <StepsStudent
        isAvailableTutoringCompleted={isAvailableTutoringsComplete}
        isConfirmationCompleted={isConfirmationComplete}
        isSubjectCompleted={isSubjectComplete}
        isTopicCompleted={isTopicComplete}
        currentRoute={query.step}
        handleStep={handleSteps}
      />
      {handleComponent()}
    </div>
  );
};

// Add sidebar layout
ScheduleTutoring.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Agendar asesoría">{page}</SidebarLayout>;
};

export default ScheduleTutoring;
