import cx from 'classnames';
import React from 'react';
import cardInfoStylesStu from '../css/components/cardInfoStu.module.css';
import ButtonTemplate from './button-template';

const interpretation = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Pendiente';
    case 'confirm':
      return 'Confirmada';
    case 'cancel':
      return 'Rechazada';
    case 'info':
      return 'Completada';
    case 'PE':
      return 'Pendiente';
    case 'AP':
      return 'Aprobada';
    case 'CO':
      return 'Completada';
    case 'CA':
      return 'Cancelada';
    default:
      return 'Pendiente';
  }
};

const IsLink = (props: { location: string }) => {
  const { location } = props;
  if (props.location.includes('http')) {
    return (
      <a className={cardInfoStylesStu.caption2} href={props.location}>
        {' '}
        {props.location}{' '}
      </a>
    );
  }
  return <span className={cardInfoStylesStu.caption}> {props.location} </span>;
};

const ItsLink = (props: { location: string }) => {
  const { location } = props;
  if (props.location.includes('http')) {
    return true;
  }
  return false;
};

function CardInfoStu(props: {
  date: string;
  subject: string;
  topic: string;
  location: string;
  status: string;
}) {
  const { date } = props; // descomposición del objeto props
  const { subject } = props;
  const { topic } = props;
  const { location } = props;
  const { status } = props;

  return (
    <div className={cardInfoStylesStu.box}>
      <div className={cardInfoStylesStu.dateSize}>
        <h1 className={cx('bi bi-alarm', cardInfoStylesStu.icon)}> </h1>
        <span className={cardInfoStylesStu.caption}> {props.date} </span>
      </div>

      <div className={cardInfoStylesStu.subjectSize}>
        <h1 className={cx('bi bi-stack', cardInfoStylesStu.icon)}> </h1>
        <span className={cardInfoStylesStu.caption}> {props.subject} </span>
      </div>

      <div className={cardInfoStylesStu.studentSize}>
        <h1 className={cx('bi bi-search', cardInfoStylesStu.icon)}> </h1>
        <span className={cardInfoStylesStu.caption}> {props.topic} </span>
      </div>

      <div className={cardInfoStylesStu.locationSize}>
        {IsLink({ location: props.location })}
      </div>

      <div className={cardInfoStylesStu.statusSize}>
        <ButtonTemplate variant={status} clickable={false}>
          {' '}
          {interpretation(status)}
        </ButtonTemplate>
      </div>
    </div>
  );
}

export default CardInfoStu;
