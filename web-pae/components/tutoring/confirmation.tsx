import styles from '@/css-components/tutoring/confirmation.module.css';
import formatTime from '@/helpers/format-time';
import {
  reset,
  selectDate,
  selectSelectedItem,
  selectSubject
} from '@/redux/schedule-tutoring';
import { selectName } from '@/redux/user';
import { useTranslation } from 'next-i18next'; // add this
import { useRouter } from 'next/router';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'store/hook';
import ButtonTemplate from '../button-template';

const TutoringConfirmation = () => {
  const { t } = useTranslation('student-schedule-tutoring'); // add this

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
      <span className={styles.title}>{t('Resumen')}</span>
      <div className={styles.box}>
        <strong>{t('Materia')}: </strong>
        {state.subject?.name}
        <br />
        <strong>{t('Dia')}: </strong>
        {new Date(state.date).toLocaleDateString('es-MX', {
          weekday: 'long',
          day: 'numeric',
          month: 'long'
        })}
        <br />
        <strong>{t('Hora')}: </strong>
        {formatTime(state.time)}
      </div>
      <p className={styles.message}>
        {state.name},{' '}
        {t(
          'tu solicitud está siendo procesada, recibirás un correo con la confirmación de tu asesoría una vez que sea aprobada.'
        )}
        <br /> <br /> {t('¡Gracias!')}
      </p>
      <div className={styles.button}>
        <ButtonTemplate
          variant="primary"
          onClick={() => scheduleTutoring()}
          loading={isLoading}
          disabled={isLoading}
        >
          {t('VER STATUS DE ASESORÍA')}
        </ButtonTemplate>
      </div>
    </div>
  );
};

export default TutoringConfirmation;
