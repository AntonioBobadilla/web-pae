import formatTime from '@/helpers/format-time';
import formatDate from 'helpers/format-date';
import CardInfo from './card-info';
import { Tutoring } from './card-info-student/types';

const CardInformation = ({ history }: { history: Tutoring[] }) => {
  return (
    <>
      {history.map((historyItem) => (
        <CardInfo
          date={
            formatDate(historyItem.date) + ' ' + formatTime(historyItem.hour)
          }
          subject={
            historyItem.subject === null ? '-' : historyItem.subject.name
          }
          student={historyItem.student.name}
          status={historyItem.status}
          key={historyItem.id}
        />
      ))}
    </>
  );
};

export default CardInformation;
