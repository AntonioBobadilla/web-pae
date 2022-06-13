/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import Carousel from 'react-elastic-carousel';
import styles from '../../css/components/dialogs/modify-schedule.module.css';
import ButtonTemplate from '../button-template';
import ClosablePopup from '../closable-popup';
import MyCalendar from '../frontend-calendar-full';
import { useTranslation } from 'next-i18next'; 

type ModifyLanguageProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  id: any;
};

const ModifySchedule = ({ visible, setVisible, id }: ModifyLanguageProps) => {
  const [allSchedules, setAllSchedules] = useState<any>([]);
  const [schedulesFirstPeriod, setSchedulesFirstPeriod] = useState<any>([]);
  const [schedulesSecondPeriod, setSchedulesSecondPeriod] = useState<any>([]);
  const [schedulesThirdPeriod, setSchedulesThirdPeriod] = useState<any>([]);
  const [textPeriod, setTextPeriod] = useState<any>('Primer periodo');

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1, itemsToScroll: 1 },
    { width: 768, itemsToShow: 1 },
    { width: 1200, itemsToShow: 1 }
  ];

  const onClickSave = () => {
    setVisible(false);
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

  React.useEffect(() => {
    fetch(`https://server-pae.azurewebsites.net/tutor/${id?.toLowerCase()}`)
      .then((res) => res.json())
      .then((data) => {
        let newArr: any = [];
        data.schedules.map(function (item: any, index: any) {
          let { period, day_week, hour } = item;
          let uniqueId =
            day_week.toString() +
            '-' +
            hour.toString() +
            '-' +
            period.toString();
          let obj = { period, day_week, hour, id: uniqueId };
          newArr.push(obj);
        });
        setAllSchedules(newArr);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const filterSchedules = () => {
    allSchedules.forEach((schedule: { period: any }) => {
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

  const deleteIdFromObj = (array: any) => {
    let newArr: any = [];
    array.map(function (item: any) {
      let { period, day_week, hour } = item;
      let obj = { period, day_week, hour };
      newArr.push(obj);
    });
    return newArr;
  };

  const updateBigSchedule = (data: any, id: any) => {
    let dataToSend = {
      tutor: id.toLowerCase(),
      schedules: [...data]
    };

    fetch('https://server-pae.azurewebsites.net/modifyschedule/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend)
    })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error('could not make POST request for that endpoint');
        } else if (res.status === 204) {
          window.location.reload();
        }
        return res.json();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const updateSchedule = () => {
    let newFirstPeriod = deleteIdFromObj(schedulesFirstPeriod);
    let newSecondPeriod = deleteIdFromObj(schedulesSecondPeriod);
    let newThirdPeriod = deleteIdFromObj(schedulesThirdPeriod);

    let allData = [...newFirstPeriod, ...newSecondPeriod, ...newThirdPeriod];
    updateBigSchedule(allData, id);
    onClickSave();
  };

  useEffect(() => {
    filterSchedules();
  }, [allSchedules]);

  const handleChangeSlider = (currentItem: any, pageIndex: any) => {
    if (pageIndex == 0) {
      setTextPeriod('Primer periodo');
    } else if (pageIndex == 1) {
      setTextPeriod('Segundo periodo');
    } else if (pageIndex == 2) {
      setTextPeriod('Tercer periodo');
    }
  };

  const { t } = useTranslation('toggle-menu');

  return (
    <ClosablePopup
      title={t('Modify Schedule')}
      line
      visible={visible}
      style={styles.container}
      setVisible={setVisible}
    >
      <div className={styles.wrapper}>
        <h2 style={{ margin: '0px 10px 20px 10px' }}>{textPeriod}</h2>
        <Carousel
          isRTL={false}
          pagination={false}
          renderArrow={myArrow}
          onChange={(currentItem, pageIndex) =>
            handleChangeSlider(currentItem, pageIndex)
          }
          breakPoints={breakPoints}
        >
          <MyCalendar
            schedulesToShow={schedulesFirstPeriod}
            period={0}
            eventObj={schedulesFirstPeriod}
            setEventObj={setSchedulesFirstPeriod}
          />
          <MyCalendar
            schedulesToShow={schedulesSecondPeriod}
            period={1}
            eventObj={schedulesSecondPeriod}
            setEventObj={setSchedulesSecondPeriod}
          />
          <MyCalendar
            schedulesToShow={schedulesThirdPeriod}
            period={2}
            eventObj={schedulesThirdPeriod}
            setEventObj={setSchedulesThirdPeriod}
          />
        </Carousel>
        <div className={styles.button}>
          <ButtonTemplate variant="confirm" onClick={updateSchedule}>
          {t('SAVE')}
          </ButtonTemplate>
        </div>
      </div>
    </ClosablePopup>
  );
};

export default ModifySchedule;
