import React from 'react';
import { HistoryMockService } from '../helpers/card-info-mock';
import CardInfo from './card-info';
import { History } from './card-info/types';

const CardInformation = () => {
  const [history, setHistory] = React.useState<History[]>(HistoryMockService());
  return history.map((history) => (
    <CardInfo
      key={history.date}
      date={history.date}
      subject={history.subject}
      student={history.student}
      status={history.status}
    />
  ));
};

export default CardInformation;
