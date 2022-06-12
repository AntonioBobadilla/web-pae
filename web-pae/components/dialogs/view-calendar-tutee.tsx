import MyCalendar from '@/components/frontend-calendar-view';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-elastic-carousel';
import styles from '../../css/components/dialogs/modify-password.module.css';
import registerStyles from '../../css/register.module.css';
import ClosablePopup from '../closable-popup';


type ModifyLanguageProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  schedules: any;
  tutorName: string;
};

const ViewCalendar = ({
  visible,
  setVisible,
  schedules,
  tutorName
}: ModifyLanguageProps) => {
  const onClickSave = () => {
    setVisible(false);
  };

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1, itemsToScroll: 1 },
    { width: 768, itemsToShow: 1 },
    { width: 1200, itemsToShow: 1 }
  ];

  const [schedulesFirstPeriod, setSchedulesFirstPeriod] = useState<any>([]);
  const [schedulesSecondPeriod, setSchedulesSecondPeriod] = useState<any>([]);
  const [schedulesThirdPeriod, setSchedulesThirdPeriod] = useState<any>([]);
  const [textPeriod, setTextPeriod] = useState('Primer periodo');
  // funcion que cambia el color de la celda.
  const changeColorOfCell = (cell: any) => {
    if (cell != null) {
      cell.style.background = '#039BE5';
      cell.style.border = 'none';
    }
  };

  const filterSchedules = () => {
    schedules.forEach((schedule: { period: number }) => {
      if (schedule.period == 0) {
        setSchedulesFirstPeriod((schedulesFirstPeriod: any) => [
          ...schedulesFirstPeriod,
          schedule
        ]);
      } else if (schedule.period == 1) {
        setSchedulesSecondPeriod((schedulesSecondPeriod: any) => [
          ...schedulesSecondPeriod,
          schedule
        ]);
      } else if (schedule.period == 2) {
        setSchedulesThirdPeriod((schedulesThirdPeriod: any) => [
          ...schedulesThirdPeriod,
          schedule
        ]);
      }
    });
  };

  useEffect(() => {
    filterSchedules();
  }, []);

  let titleTutor = 'Horario de ' + tutorName;
  const handleChangeSlider = (currentItem: any, pageIndex: any) => {
    if (currentItem.item.period == 0) {
      setTextPeriod('Primer periodo');
    } else if (currentItem.item.period == 1) {
      setTextPeriod('Segundo periodo');
    } else if (currentItem.item.period == 2) {
      setTextPeriod('Tercer periodo');
    }
  };

  function myArrow({ type, onClick, isEdge }: any) {
    const pointer = type === 'PREV' ? 'left' : 'right';
    return (
      <div
        style={{ display: 'flex', alignItems: 'center' }}
        onClick={onClick}
        role="button"
      >
        <i
          style={{ fontSize: '30px' }}
          className={`bi bi-chevron-${pointer}`}
        />
      </div>
      // <button className={styles.arrowButton} onClick={onClick} disabled={isEdge}>
      //   {pointer}
      // </button>
    );
  }

  return (
    <ClosablePopup
      title={titleTutor}
      line
      visible={visible}
      style={styles.container}
      setVisible={setVisible}
    >
      <div
        className={registerStyles.languageOptions}
        style={{ flexDirection: 'column', padding: '30px' }}
      >
        <h2 style={{ margin: '0px 10px 20px 10px' }}>{textPeriod}</h2>
        <Carousel
          isRTL={false}
          renderArrow={myArrow}
          onChange={(currentItem, pageIndex) =>
            handleChangeSlider(currentItem, pageIndex)
          }
          breakPoints={breakPoints}
        >
          <MyCalendar
            changeColorOfCell={changeColorOfCell}
            schedulesToShow={schedulesFirstPeriod}
            period={0}
          />
          <MyCalendar
            changeColorOfCell={changeColorOfCell}
            schedulesToShow={schedulesSecondPeriod}
            period={1}
          />
          <MyCalendar
            changeColorOfCell={changeColorOfCell}
            schedulesToShow={schedulesThirdPeriod}
            period={2}
          />
        </Carousel>
      </div>
    </ClosablePopup>
  );
};

export default ViewCalendar;
