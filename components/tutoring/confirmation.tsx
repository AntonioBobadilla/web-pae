import styles from '@/css-components/tutoring/confirmation.module.css';
import formatTime from '@/helpers/format-time';
import {
  reset,
  selectDate,
  selectSelectedItem,
  selectSubject
} from '@/redux/schedule-tutoring';
import { selectName } from '@/redux/user';
import { useRouter } from 'next/router';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'store/hook';
import ButtonTemplate from '../button-template';

const TutoringConfirmation = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const state = {
    name: useAppSelector(selectName),
    subject: useAppSelector(selectSubject),
    date: useAppSelector(selectDate),
    time: useAppSelector(selectSelectedItem).hour
  };
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const scheduleTutoring = () => {
    setIsLoading(true);
    setTimeout(() => {
      // TODO: reserve tutoring
      dispatch(reset());
      push('/student/profile');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>Resumen</span>
      <div className={styles.box}>
        <strong>Materia: </strong>
        {state.subject?.name}
        <br />
        <strong>Día: </strong>
        {new Date(state.date).toLocaleDateString('es-MX', {
          weekday: 'long',
          day: 'numeric',
          month: 'long'
        })}
        <br />
        <strong>Hora: </strong>
        {formatTime(state.time)}
      </div>
      <p className={styles.message}>
        {state.name}, tu solicitud está siendo procesada, recibirás un correo
        con la confirmación de tu asesoría una vez que sea aprobada.
        <br /> <br /> ¡Gracias!
      </p>
      <div className={styles.button}>
        <ButtonTemplate
          variant="primary"
          onClick={() => scheduleTutoring()}
          loading={isLoading}
          disabled={isLoading}
        >
          VER STATUS DE ASESORÍA
        </ButtonTemplate>
      </div>
    </div>
  );
};

export default TutoringConfirmation;
