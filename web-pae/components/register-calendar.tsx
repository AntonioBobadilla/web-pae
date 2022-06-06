import {
  selectFirstPeriod,
  selectSecondPeriod,
  selectThirdPeriod,
  setPeriod
} from '@/redux/create-tutor';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hook';
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

interface State {
  [key: number]: any;
}

const titles: Title = {
  0: 'primer periodo',
  1: 'segundo periodo',
  2: 'tercer periodo',
  3: 'final'
};

const periods: Title = {
  0: 'first',
  1: 'second',
  2: 'third',
  3: 'fourth'
};

const max = 3;
const min = 0;

const RegisterCalendar = React.memo(
  ({ nextStep, previousStep }: RegisterCalendarProps) => {
    const [progressBarState, setProgressBarState] = React.useState(0);

    const states: State = {
      0: useAppSelector(selectFirstPeriod),
      1: useAppSelector(selectSecondPeriod),
      2: useAppSelector(selectThirdPeriod),
      3: []
    };
    const [title, setTitle] = useState(titles[0]);
    const [eventObj, setEventObj] = useState([]);
    const dispatch = useAppDispatch();

    // funcion que cambia el color de la celda.
    const changeColorOfCell = (cell: any) => {
      cell.style.background = '#039BE5';
      cell.style.border = 'none';
    };

    React.useEffect(() => {
      const paintCells = (cells: any) => {
        cells.forEach((cell: any) => {
          changeColorOfCell(document.getElementById(cell.id));
        });
      };

      if (progressBarState === max) {
        nextStep();
      }

      const newData = states[progressBarState];
      setEventObj(newData);

      setTimeout(() => {
        paintCells(newData);
      }, 100);
      // paintCells(eventObj);
    }, [progressBarState]);

    // funcion que cambia el color de la celda.
    const resetColorOfCell = (cell: any) => {
      cell.style.background = 'none';
      cell.style.border = '1px solid #f1f1f1';
    };

    const clearCells = () => {
      eventObj.forEach((cell: any) => {
        resetColorOfCell(document.getElementById(cell.id));
      });
    };

    const handleNextStep = () => {
      clearCells();

      dispatch(
        setPeriod({ period: eventObj, name: periods[progressBarState] })
      );

      setProgressBarState(progressBarState + 1);
      setTitle(titles[progressBarState + 1]);
    };

    const handlePreviousStep = () => {
      clearCells();

      dispatch(
        setPeriod({ period: eventObj, name: periods[progressBarState] })
      );
      if (progressBarState === min) {
        previousStep();
      } else {
        setProgressBarState(progressBarState - 1);
        setTitle(titles[progressBarState - 1]);
      }
    };

    return (
      <div className={styles.container}>
        <div className={styles.calendar}>
          <h3 className={styles.title}>
            Selecciona tu horario para el <strong> {title} </strong>
          </h3>
          <MyCalendar
            eventObj={eventObj}
            setEventObj={setEventObj}
            resetColorOfCell={resetColorOfCell}
            changeColorOfCell={changeColorOfCell}
          />
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
              <ButtonTemplate
                onClick={handlePreviousStep}
                variant="secondary"
                style={{ marginRight: '7.5px' }}
              >
                ANTERIOR
              </ButtonTemplate>
              <ButtonTemplate
                onClick={handleNextStep}
                variant="primary"
                style={{ marginLeft: '7.5px' }}
                disabled={eventObj.length < 5}
              >
                SIGUIENTE
              </ButtonTemplate>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default RegisterCalendar;
