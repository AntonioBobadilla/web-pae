import React, { useEffect, useState } from 'react';
import styles from '../../css/components/dialogs/modify-password.module.css';
import registerStyles from '../../css/register.module.css';
import ButtonTemplate from '../button-template';
import ClosablePopup from '../closable-popup';
import ToggleButton from '../toggle-button';
import MyCalendar from '@/components/frontend-calendar-view';
import Carousel, { consts } from 'react-elastic-carousel';
import classNames from 'classnames';

type ModifyLanguageProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void,
  schedules: any,
  tutorName:string;
};

const ViewCalendar = ({ visible, setVisible, schedules, tutorName }: ModifyLanguageProps) => {
  const onClickSave = () => {
    setVisible(false);
  };

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1, itemsToScroll: 1 },
    { width: 768, itemsToShow: 1 },
    { width: 1200, itemsToShow: 1 }
  ];

  const [schedulesFirstPeriod, setSchedulesFirstPeriod] = useState([]);
  const [schedulesSecondPeriod, setSchedulesSecondPeriod] = useState([]);
  const [schedulesThirdPeriod, setSchedulesThirdPeriod] = useState([]);
  const [textPeriod, setTextPeriod] = useState('Primer periodo');
  // funcion que cambia el color de la celda.
  const changeColorOfCell = (cell: any) => {
      if (cell != null ){
        cell.style.background = '#039BE5';
        cell.style.border = 'none';
      }
 };


const filterSchedules = () => {
  schedules.forEach(schedule => {
    if (schedule.period == 0){
      setSchedulesFirstPeriod(schedulesFirstPeriod => [...schedulesFirstPeriod, schedule]);
    } else if(schedule.period == 1) {
      setSchedulesSecondPeriod(schedulesSecondPeriod => [...schedulesSecondPeriod, schedule]);
    } else if (schedule.period == 2) {
      setSchedulesThirdPeriod(schedulesThirdPeriod => [...schedulesThirdPeriod, schedule]);
    }
  })
}



 useEffect(() => {
    filterSchedules();
 },[])


    let titleTutor = "Horario de "+tutorName
  const handleChangeSlider = (currentItem, pageIndex) => {
    if (currentItem.item.period == 0){
      setTextPeriod('Primer periodo');
    } else if(currentItem.item.period == 1) {
      setTextPeriod('Segundo periodo');
    } else if(currentItem.item.period == 2) {
      setTextPeriod('Tercer periodo');
    }
  }  

  function myArrow({ type, onClick, isEdge }) {
    const pointer = type === consts.PREV ? 'left' : 'right';
    return (
      <div
        style={{'display':'flex', 'alignItems':'center'}}
        onClick={onClick}
        role="button"
      >
        <i style={{'fontSize':'30px'}} className={`bi bi-chevron-${pointer}`} />
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
      <div className={registerStyles.languageOptions} style={{'flexDirection':'column', 'padding':'30px'}}>
        <h2 style={{'margin':'0px 10px 20px 10px'}}>{textPeriod}</h2>
        <Carousel renderArrow={myArrow}   onChange={(currentItem, pageIndex) => handleChangeSlider(currentItem, pageIndex )} breakPoints={breakPoints}>
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
