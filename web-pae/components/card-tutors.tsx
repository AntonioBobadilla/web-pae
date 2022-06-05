import React from 'react';
import Carousel from 'react-elastic-carousel';
import cardTutorsStyles from '../css/components/cardTutors.module.css';
import StudentQuestion from './dialogs/student-question';

const CardTutors = () => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1 },
    { width: 768, itemsToShow: 2 },
    { width: 1200, itemsToShow: 3 }
  ];
  const [QuestionVisible, setQuestionVisible] = React.useState(false);
  const [tutoringObject, setTutoringObject] = React.useState(false);

  const onClickQuestionVisible = (obj) => {
    setTutoringObject(obj);
    setQuestionVisible(true);
  };

  let tutorings = [
    {
      firstName: 'Jose Antonio',
      lastName: 'Bobadilla Garcia',
      degree: 'ITC',
      id: 'A01734433',
      date: 'Lunes 21 de Mayo',
      hour: '3:00 - 4:00 PM',
      place: 'Zoom ID: 1234 56722 55813',
      subject: 'Programacion Orientada a Objetos',
      doubtTitle:
        'Bases de datos aaaaaaaaa aaaaaaaaaaa aaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaaaaa aaa',
      doubt:
        'Tengo una tarea sobre la creacion de una base de datos pero no se hacer la normalizacion de tablas',
      attatchment: ''
    },
    {
      firstName: 'Karen ',
      lastName: 'Rugerio ',
      degree: 'ITC',
      id: 'A01734433',
      date: 'Lunes 21 de Mayo',
      hour: '3:00 - 4:00 PM',
      place: 'Zoom ID: 1234 56722 55813',
      subject: 'Programacion Orientada a Objetos',
      doubtTitle: 'Bases de datos',
      doubt:
        'Tengo una tarea sobre la creacion de una base de datos pero no se hacer la normalizacion de tablas',
      attatchment: ''
    },
    {
      firstName: 'Alejandro',
      lastName: 'Castro Reus',
      degree: 'ITC',
      id: 'A01734433',
      date: 'Lunes 21 de Mayo',
      hour: '3:00 - 4:00 PM',
      place: 'Zoom ID: 1234 56722 55813',
      subject: 'Programacion Orientada a Objetos',
      doubtTitle: 'Bases de datos',
      doubt:
        'Tengo una tarea sobre la creacion de una base de datos pero no se hacer la normalizacion de tablas',
      attatchment: ''
    },
    {
      firstName: 'Bryan',
      lastName: 'Gonzales Arellano',
      degree: 'ITC',
      id: 'A01734433',
      date: 'Lunes 21 de Mayo',
      hour: '3:00 - 4:00 PM',
      place: 'Zoom ID: 1234 56722 55813',
      subject: 'Programacion Orientada a Objetos',
      doubtTitle: 'Bases de datos',
      doubt:
        'Tengo una tarea sobre la creacion de una base de datos pero no se hacer la normalizacion de tablas',
      attatchment: ''
    }
  ];

  return (
    <div className={cardTutorsStyles.cardTutorsSection}>
      <Carousel breakPoints={breakPoints} pagination={false}>
        {tutorings.map(function (obj) {
          return (
            <div className={cardTutorsStyles.cardTutors}>
              <div className={cardTutorsStyles.studentInfo}>
                <div className={cardTutorsStyles.profileIcon}>
                  <i className="bi bi-person-circle" />
                </div>
                <b className={cardTutorsStyles.firstName}>{obj.firstName}</b>
                <p className={cardTutorsStyles.lastName}>{obj.lastName}</p>
                <div className={cardTutorsStyles.degreeSection}>
                  <p className={cardTutorsStyles.degree}>{obj.degree}</p>
                  <p className={cardTutorsStyles.matricula}>{obj.id}</p>
                </div>
              </div>
              <div className={cardTutorsStyles.itemsWrap}>
                <div className={cardTutorsStyles.itemCard}>
                  <div className={cardTutorsStyles.itemIcon}>
                    <i className="bi bi-calendar" />
                  </div>
                  <p className={cardTutorsStyles.itemText}>{obj.date}</p>
                </div>
                <div className={cardTutorsStyles.itemCard}>
                  <div className={cardTutorsStyles.itemIcon}>
                    <i className="bi bi-alarm" />
                  </div>
                  <p className={cardTutorsStyles.itemText}>{obj.hour}</p>
                </div>
                <div className={cardTutorsStyles.itemCard}>
                  <div className={cardTutorsStyles.itemIcon}>
                    <i className="bi bi-geo-alt" />
                  </div>
                  <p className={cardTutorsStyles.itemText}>{obj.place}</p>
                </div>
                <div className={cardTutorsStyles.itemCard}>
                  <div className={cardTutorsStyles.itemIcon}>
                    <i className="bi bi-stack" />
                  </div>
                  <p className={cardTutorsStyles.itemText}>{obj.subject}</p>
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
      <StudentQuestion
        visible={QuestionVisible}
        setVisible={setQuestionVisible}
        tutoringObject={tutoringObject}
        /* handle attachment showing with this on click :) */
        attatchmentOnClick={undefined}
      />
    </div>
  );
};

export default CardTutors;
