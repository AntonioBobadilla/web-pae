import formatDate from '@/helpers/format-date';
import formatTime from '@/helpers/format-time';
import createDate from 'helpers/create-date';
import React from 'react';
import Carousel from 'react-elastic-carousel';
import { useAppSelector } from 'store/hook';
import { selectID, selectToken } from 'store/reducers/user';
import cardTutorsStyles from '../css/components/cardTutors.module.css';
import { Tutoring } from './card-info-student/types';
import StudentQuestion from './dialogs/student-question';

const CardTutors = () => {
  const [assignedTutorings, setAssignedTutorings] = React.useState<Tutoring[]>(
    []
  );
  const [QuestionVisible, setQuestionVisible] = React.useState(false);
  const [tutoringObject, setTutoringObject] = React.useState<Tutoring>();

  const id = useAppSelector(selectID);
  const token = useAppSelector(selectToken);
  React.useEffect(() => {
    fetch(
      `https://server-pae.azurewebsites.net/tutoring/?status=AP&tutor=${id?.toLowerCase()}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`
        }
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const newData = [...data];
        // sor by date
        newData.sort((a, b) => {
          if (createDate(b.date, b.hour) > createDate(a.date, a.hour)) {
            return -1;
          }
          if (createDate(b.date, b.hour) < createDate(a.date, a.hour)) {
            return 1;
          }
          return 0;
        });
        // TODO: SET DATA
        console.log(newData);
        setAssignedTutorings(newData);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1 },
    { width: 768, itemsToShow: 2 },
    { width: 1200, itemsToShow: 3 }
  ];

  const onClickQuestionVisible = (obj: Tutoring) => {
    setTutoringObject(obj);
    setQuestionVisible(true);
  };

  return (
    <div className={cardTutorsStyles.cardTutorsSection}>
      <Carousel breakPoints={breakPoints} pagination={false} isRTL={false}>
        {assignedTutorings.map((obj, index) => {
          const { student, subject } = obj;
          const place = obj.is_online
            ? `ZOOM ID: ${obj.place}`
            : `AULA: ${obj.place}`;
          return (
            <div key={index} className={cardTutorsStyles.cardTutors}>
              <div className={cardTutorsStyles.studentInfo}>
                <div className={cardTutorsStyles.profileIcon}>
                  <i className="bi bi-person-circle" />
                </div>
                <b className={cardTutorsStyles.firstName}>{student.name}</b>
                <p className={cardTutorsStyles.lastName} />
                <div className={cardTutorsStyles.degreeSection}>
                  <p className={cardTutorsStyles.degree}>{student.major}</p>
                  <p className={cardTutorsStyles.matricula}>
                    {student.registration_number}
                  </p>
                </div>
              </div>
              <div className={cardTutorsStyles.itemsWrap}>
                <div className={cardTutorsStyles.itemCard}>
                  <div className={cardTutorsStyles.itemIcon}>
                    <i className="bi bi-calendar" />
                  </div>
                  <p className={cardTutorsStyles.itemText}>
                    {formatDate(obj.date)}
                  </p>
                </div>
                <div className={cardTutorsStyles.itemCard}>
                  <div className={cardTutorsStyles.itemIcon}>
                    <i className="bi bi-alarm" />
                  </div>
                  <p className={cardTutorsStyles.itemText}>
                    {formatTime(obj.hour)}
                  </p>
                </div>
                <div className={cardTutorsStyles.itemCard}>
                  <div className={cardTutorsStyles.itemIcon}>
                    <i className="bi bi-geo-alt" />
                  </div>
                  <p className={cardTutorsStyles.itemText}>{place}</p>
                </div>
                <div className={cardTutorsStyles.itemCard}>
                  <div className={cardTutorsStyles.itemIcon}>
                    <i className="bi bi-stack" />
                  </div>
                  <p className={cardTutorsStyles.itemText}>{subject.name}</p>
                </div>
                <button
                  className={cardTutorsStyles.button}
                  onClick={() => onClickQuestionVisible(obj)}
                >
                  Consultar duda
                </button>
              </div>
            </div>
          );
        })}
      </Carousel>
      {tutoringObject != null && tutoringObject.student && (
        <StudentQuestion
          visible={QuestionVisible}
          setVisible={setQuestionVisible}
          tutoringObject={tutoringObject}
          /* handle attachment showing with this on click :) */
        />
      )}
    </div>
  );
};

export default CardTutors;
