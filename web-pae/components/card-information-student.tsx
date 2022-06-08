import formatTime from '@/helpers/format-time';
import React from 'react';
import { useAppSelector } from 'store/hook';
import { selectID } from 'store/reducers/user';
import CardInfoStu from './card-info-student';
import { Tutoring } from './card-info-student/types';

const CardInformationStu = () => {
  const [historystu, setHistoryStu] = React.useState<Tutoring[]>([]);
  const id = useAppSelector(selectID);

  React.useEffect(() => {
    fetch(
      `http://server-pae.azurewebsites.net/tutoring/?student=${id?.toLowerCase()}`
    )
      .then((res) => res.json())
      .then((data) => {
        const newData = [...data];
        newData.sort((a, b) => new Date(b.date) - new Date(a.date));
        setHistoryStu(newData);
      });
  }, []);

  return (
    <>
      {historystu.map((history) => (
        <CardInfoStu
          date={`${new Date(
            `${history.date}T${history.hour < 10 ? 0 : ''}${history.hour}:00`
          ).toLocaleDateString('es-MX', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC'
          })} ${formatTime(history.hour)}`}
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
