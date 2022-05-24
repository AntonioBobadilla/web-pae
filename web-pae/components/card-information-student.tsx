import { HistoryStuMockService } from '../helpers/card-info-student-mock';
import React from 'react';
import CardInfoStu from './card-info-student';
import { HistoryStu } from './card-info-student/types';

const CardInformationStu = () => {
  const [historystu, setHistoryStu] = React.useState<HistoryStu[]>(
    HistoryStuMockService()
  );
  return historystu.map((historystu) => (
    <CardInfoStu
      date={historystu.date}
      subject={historystu.subject}
      student={historystu.student}
      location={historystu.location}
      status={historystu.status}
      key={historystu.date}
    />
  ));
};

export default CardInformationStu;
