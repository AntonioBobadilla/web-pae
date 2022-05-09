import React, { useState } from 'react';
import styles from '../css/components/register-calendar.module.css';
import RegisterStyle from '../css/tutor/register.module.css';
import ButtonTemplate from './button-template';
import MyCalendar from './frontend-calendar';
import ProgressBar from './progress-bar';

interface RegisterCalendarProps {
  nextStep: () => void;
  previousStep: () => void;
}

interface Title {
  [key: number]: string;
}

const titles: Title = {
  0: 'Primer periodo',
  1: 'Segundo periodo',
  2: 'Tercer periodo'
};

const RegisterCalendar = ({
  nextStep,
  previousStep
}: RegisterCalendarProps) => {
  const [progressBarState, setProgressBarState] = React.useState(0);
  const [eventObj, setEventObj] = useState([]);
  const [title, setTitle] = useState(titles[0]);
  const max = 3;
  const min = 0;

  const handleNextStep = () => {
    if (progressBarState === max) {
      nextStep();
    } else {
      setProgressBarState(progressBarState + 1);
      setTitle(titles[progressBarState + 1]);
      setEventObj([]);
    }
  };

  const handlePreviousStep = () => {
    if (progressBarState === min) {
      previousStep();
    } else {
      setProgressBarState(progressBarState - 1);
      setTitle(titles[progressBarState - 1]);
    }
  };
  // const back = () => {
  //   if (progressBarState > min) {
  //     setProgressBarState(progressBarState - 1);
  //   } else {
  //     setProgressBarState(progressBarState);
  //   }
  // };

  // const next = () => {
  //   if (progressBarState < max) {
  //     setProgressBarState(progressBarState + 1);
  //   } else {
  //     setProgressBarState(progressBarState);
  //   }
  // };
  return (
    <div className={styles.container}>
      <div className={styles.calendar}>
        <h3 className={styles.title}>{title}</h3>
        <MyCalendar eventObj={eventObj} setEventObj={setEventObj} />
      </div>
      <div className={styles.buttons}>
        <div className={RegisterStyle.completed}>
          <div className={RegisterStyle.box}>
            <p className={RegisterStyle.per}> Completado </p>
            <div className={RegisterStyle.barDiv}>
              <ProgressBar progress={progressBarState} />
            </div>
            <p className={RegisterStyle.estatus}>
              {progressBarState} / {max}
            </p>
          </div>

          <div className={RegisterStyle.buttons}>
            <ButtonTemplate onClick={handlePreviousStep} variant="secondary">
              ANTERIOR
            </ButtonTemplate>
            <ButtonTemplate onClick={handleNextStep} variant="primary">
              SIGUIENTE
            </ButtonTemplate>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCalendar;
