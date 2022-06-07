import React, { useState } from 'react';
import styles from '../../css/components/dialogs/modify-password.module.css';
import registerStyles from '../../css/register.module.css';
import ButtonTemplate from '../button-template';
import ClosablePopup from '../closable-popup';
import ToggleButton from '../toggle-button';
import MyCalendar from '@/components/frontend-calendar-view';

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

  const [eventObj, setEventObj] = useState([]);
  // funcion que cambia el color de la celda.
  const changeColorOfCell = (cell: any) => {
      if (cell != null ){
        cell.style.background = '#039BE5';
        cell.style.border = 'none';
      }
 };
// funcion que cambia el color de la celda.
const resetColorOfCell = (cell: any) => {
   cell.style.background = 'none';
   cell.style.border = '1px solid #f1f1f1';
 };
console.log("aaa", schedules)
    let titleTutor = "Horario de "+tutorName
  return (
    <ClosablePopup
      title={titleTutor}
      line
      visible={visible}
      style={styles.container}
      setVisible={setVisible}
    >
      <div className={registerStyles.languageOptions}>
        <MyCalendar
                eventObj={eventObj}
                setEventObj={setEventObj}
                resetColorOfCell={resetColorOfCell}
                changeColorOfCell={changeColorOfCell}
                schedulesToShow={schedules}
            />
      </div>
    </ClosablePopup>
  );
};

export default ViewCalendar;
