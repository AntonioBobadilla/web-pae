import React from 'react';
import { HistoryStuMockService } from '../helpers/card-info-student-mock';
import CardInfoStu from './card-info-student';
import { HistoryStu } from './card-info-student/types';

const CardInformationStu = () => {
  const [historystu, setHistoryStu] = React.useState<HistoryStu[]>(
    HistoryStuMockService()
  );
  return (
    <>
      {historystu.map((history) => (
        <CardInfoStu
          date={history.date}
          subject={history.subject}
          student={history.student}
          location={history.location}
          status={history.status}
          key={history.date}
        />
      ))}
    </>
  );
};

export default CardInformationStu;
