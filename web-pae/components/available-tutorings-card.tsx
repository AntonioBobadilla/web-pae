import cx from 'classnames';
import React from 'react';
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
  } else {
    return (
      <span className={availableTutStyle.caption}> {props.location} </span>
    );
  }
};

const ItsLink = (props: { location: string }) => {
  const { location } = props;
  if (props.location.includes('http')) {
    return true;
  } else {
    return false;
  }
};

function AvailableTutCard(props: {
  date: string;
  time: string;
  location: string;
}) {
  const { date } = props; // descomposición del objeto props
  const { time } = props;
  const { location } = props;

  return (
    <div className={availableTutStyle.box}>
      <span className={availableTutStyle.title}>Fecha seleccionada</span>

      <div className={availableTutStyle.components}>
        <div className={availableTutStyle.date}>
          <h3 className={cx('bi bi-alarm', availableTutStyle.icon)}> </h3>
          <span className={availableTutStyle.caption}> {props.date} </span>
        </div>

        <div className={availableTutStyle.time}>
          <h3 className={cx('bi bi-alarm', availableTutStyle.icon)}> </h3>
          <span className={availableTutStyle.caption}> {props.time} </span>
        </div>

        <div className={availableTutStyle.location}>
          <h3 className={cx('bi bi-person-circle', availableTutStyle.icon)}>
            {' '}
          </h3>
          <span className={availableTutStyle.caption}> {props.location} </span>
        </div>
      </div>
      <div className={availableTutStyle.btnctn}>
        <div className={availableTutStyle.btn}>
          <ButtonTemplate clickable={true} variant={'primary'}>
            {' '}
            CONFIRMAR HORARIO
          </ButtonTemplate>
        </div>
      </div>
    </div>
  );
}

export default AvailableTutCard;
