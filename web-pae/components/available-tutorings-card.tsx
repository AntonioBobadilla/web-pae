import cx from 'classnames';
import { useTranslation } from 'next-i18next'; // add this
import availableTutStyle from '../css/components/availableTutoringsCard.module.css';
import ButtonTemplate from './button-template';

const IsLink = (props: { location: string }) => {
  const { location } = props;
  if (props.location.includes('http')) {
    return (
      <a className={availableTutStyle.caption2} href={props.location}>
        {' '}
        {props.location}{' '}
      </a>
    );
  }
  return <span className={availableTutStyle.caption}> {props.location} </span>;
};

const ItsLink = (props: { location: string }) => {
  const { location } = props;
  if (props.location.includes('http')) {
    return true;
  }
  return false;
};



function AvailableTutCard(props: {
  date: string;
  time: string;
  location: string;
  nextStep: () => void;
}) {
const { t } = useTranslation('student-schedule-tutoring'); // add this

  const { date } = props; // descomposición del objeto props
  const { time } = props;
  const { location, nextStep } = props;

  return (
    <div className={availableTutStyle.box}>
      <span className={availableTutStyle.title}>{t('Fecha seleccionada')}</span>

      <div className={availableTutStyle.components}>
        <div className={availableTutStyle.date}>
          <h3 className={cx('bi bi-alarm', availableTutStyle.icon)}> </h3>
          <span className={availableTutStyle.caption}> {date} </span>
        </div>

        <div className={availableTutStyle.time}>
          <h3 className={cx('bi bi-alarm', availableTutStyle.icon)}> </h3>
          <span className={availableTutStyle.caption}> {time} </span>
        </div>

        <div className={availableTutStyle.location}>
          <h3 className={cx('bi bi-person-circle', availableTutStyle.icon)}>
            {' '}
          </h3>
          <span className={availableTutStyle.caption}> {location} </span>
        </div>
      </div>
      <div className={availableTutStyle.btnctn}>
        <div className={availableTutStyle.btn}>
          <ButtonTemplate onClick={() => nextStep()} variant="primary">
            {t('CONFIRMAR HORARIO')}
          </ButtonTemplate>
        </div>
      </div>
    </div>
  );
}

export default AvailableTutCard;
