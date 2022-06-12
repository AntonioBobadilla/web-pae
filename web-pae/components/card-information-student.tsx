import createDate from 'helpers/create-date';
import formatDate from 'helpers/format-date';
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
      `https://server-pae.azurewebsites.net/tutoring/?student=${id?.toLowerCase()}`
    )
      .then((res) => res.json())
      .then((data) => {
        const newData = [...data];
        newData.sort((a, b) => {
          if (createDate(b.date, b.hour) > createDate(a.date, a.hour)) {
            return -1;
          }
          if (createDate(b.date, b.hour) < createDate(a.date, a.hour)) {
            return 1;
          }
          return 0;
        });
        setHistoryStu(newData);
      })
      .catch((err) => console.log(err.message));
  }, []);

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
