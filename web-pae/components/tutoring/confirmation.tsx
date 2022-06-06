import styles from '@/css-components/tutoring/confirmation.module.css';
import {
  selectDate,
  selectSubject,
  selectTime
} from '@/redux/schedule-tutoring';
import { selectName } from '@/redux/user';
import { useRouter } from 'next/router';
import React from 'react';
import { useAppSelector } from 'store/hook';
import ButtonTemplate from '../button-template';

const TutoringConfirmation = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const state = {
    name: useAppSelector(selectName),
    subject: useAppSelector(selectSubject),
    date: useAppSelector(selectDate),
    time: useAppSelector(selectTime)
  };
  const { push } = useRouter();

  const scheduleTutoring = () => {
    setIsLoading(true);
    setTimeout(() => {
      // TODO: reserve tutoring
      push('/student/profile');
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>Resumen</span>
      <div className={styles.box}>
        <strong>Materia: </strong>
        {state.subject?.name}
        <br />
        <strong>Día: </strong>
        {state.date}
        <br />
        <strong>Hora: </strong>
        {state.time}
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
