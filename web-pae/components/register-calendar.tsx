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

const RegisterCalendar = ({
  nextStep,
  previousStep
}: RegisterCalendarProps) => {
  const [subjects, setSubjects] = useState([]);
  const [subjectsFiltered, setSubjectsFiltered] = useState([]);
  const [subjectsSelected, setSubjectsSelected] = useState([]);
  const [query, setQuery] = useState('');
  const [progressBarState, setProgressBarState] = React.useState(0);
  const max = 3;
  const min = 0;
  const back = () => {
    if (progressBarState > min) {
      setProgressBarState(progressBarState - 1);
    } else {
      setProgressBarState(progressBarState);
    }
  };

  const next = () => {
    if (progressBarState < max) {
      setProgressBarState(progressBarState + 1);
    } else {
      setProgressBarState(progressBarState);
    }
  };
  return (
    <div className={styles.container}>
      <MyCalendar />
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
            <ButtonTemplate
              onClickFunction={back}
              color="#DADADA"
              text="ANTERIOR"
            />
            <ButtonTemplate
              onClickFunction={next}
              color="#039BE5"
              text="SIGUIENTE"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCalendar;
