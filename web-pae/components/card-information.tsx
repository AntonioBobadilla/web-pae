import React from 'react';
import { HistoryMockService } from '../helpers/card-info-mock';
import CardInfo from './card-info';
import { History } from './card-info/types';

const CardInformation = () => {
  const [history, setHistory] = React.useState<History[]>(HistoryMockService());
  return history.map((history) => (
    <CardInfo
      date={history.date}
      subject={history.subject}
      student={history.student}
      status={history.status}
      key={history.date}
    />
  ));
};

export default CardInformation;
