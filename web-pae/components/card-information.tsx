import React from 'react';
import { HistoryMockService } from '../helpers/card-info-mock';
import CardInfo from './card-info';
import { History } from './card-info/types';

const CardInformation = () => {
  const [history, setHistory] = React.useState<History[]>(HistoryMockService());
  return (
    <>
      {history.map((historyItem) => (
        <CardInfo
          date={historyItem.date}
          subject={historyItem.subject}
          student={historyItem.student}
          status={historyItem.status}
          key={historyItem.date}
        />
      ))}
    </>
  );
};

export default CardInformation;
