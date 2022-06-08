import formatDate from 'helpers/format-date';
import React from 'react';
import { useAppSelector } from 'store/hook';
import { selectID } from 'store/reducers/user';
import CardInfo from './card-info';
import { Tutoring } from './card-info-student/types';

const CardInformation = () => {
  const [history, setHistory] = React.useState<Tutoring[]>([]);

  const id = useAppSelector(selectID);

  React.useEffect(() => {
    fetch(
      `http://server-pae.azurewebsites.net/tutoring/?tutor=${id?.toLowerCase()}`
    )
      .then((res) => res.json())
      .then((data) => {
        const newData = [...data];
        newData.sort(
          (a, b) => createDate(b.date, b.hour) - createDate(a.date, a.hour)
        );
        setHistory(newData);
      });
  }, []);

  return (
    <>
      {history.map((historyItem) => (
        <CardInfo
          date={formatDate(historyItem.date)}
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
