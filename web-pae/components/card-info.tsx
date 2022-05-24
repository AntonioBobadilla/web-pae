import React, { useState } from 'react';
import cardInfoStyles from '../css/components/cardInfo.module.css';
import cx from 'classnames';
import ButtonTemplate from './button-template';

const CardInfo = (props: {
  date: string;
  subject: string;
  student: string;
  status: string;
}) => {
  const { date } = props; //descomposición del objeto props
  const { subject } = props;
  const { student } = props;
  const { status } = props;

  return (
    <div className={cardInfoStyles.box}>
      <div className={cardInfoStyles.dateSize}>
        <h1 className={cx('bi bi-alarm', cardInfoStyles.icon)}> </h1>
        <span className={cardInfoStyles.caption}> {props.date} </span>
      </div>

      <div className={cardInfoStyles.subjectSize}>
        <h1 className={cx('bi bi-stack', cardInfoStyles.icon)}> </h1>
        <span className={cardInfoStyles.caption}> {props.subject} </span>
      </div>

      <div className={cardInfoStyles.studentSize}>
        <h1 className={cx('bi bi-person-circle', cardInfoStyles.icon)}> </h1>
        <span className={cardInfoStyles.caption}> {props.student} </span>
      </div>

      <div className={cardInfoStyles.statusSize}>
        <ButtonTemplate variant={status}>{props.status}</ButtonTemplate>
      </div>
    </div>
  );
};

export default CardInfo;
