import formatDate from 'helpers/format-date';
import CardInfoStu from './card-info-student';
import { Tutoring } from './card-info-student/types';

const CardInformationStu = ({ historystu }: { historystu: Tutoring[] }) => {
  return (
    <>
      {historystu.map((history) => (
        <CardInfoStu
          date={formatDate(history.date)}
          subject={history.subject === null ? '-' : history.subject.name}
          topic={history.topic}
          location={history.place}
          status={history.status}
          key={history.id}
        />
      ))}
    </>
  );
};

export default CardInformationStu;
