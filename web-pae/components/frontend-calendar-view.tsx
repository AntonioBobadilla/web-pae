import cx from 'classnames';
import React, { useEffect } from 'react';
import styles from '../css/components/calendar-view.module.css';
import Cell from './frontend-calendar-cellComponentView';

interface MyCalendarProps {
  eventObj: never[];
  setEventObj: React.Dispatch<React.SetStateAction<never[]>>;
  changeColorOfCell: (cell: any) => void;
  resetColorOfCell: (cell: any) => void;
  schedulesToShow: any;
}

const MyCalendar = ({
  eventObj,
  setEventObj,
  changeColorOfCell,
  resetColorOfCell,
  schedulesToShow
}: MyCalendarProps) => {


  setTimeout(() => {
    showSchedules(schedulesToShow);
  }, 1000);




  // función que al dar click en una celda la encuentra dado un string perteneciente al dia y hora.
  const findSelectedCell = (id) => {

    let Cell = null;
    const cells = document.querySelectorAll('.data');
    cells.forEach((cell) => {
      const attr = cell.getAttribute('id');
      console.log(cell)
      if (id == attr) {
        Cell = cell;
        return cell;
      }
    });
    return Cell;
  };


  // función que maneja el click en las celdas.
  const showSchedules = (scheduleObj) => {

    scheduleObj.forEach(item => {
        let dayWeek = item.day_week.toString();
        let hour = item.hour.toString();
        let id = dayWeek+"-"+hour;
        const cell = findSelectedCell(id);
        changeColorOfCell(cell);
    })

    
  };


  return (
    <div className={styles.wrapper}>
      <table className={cx(styles.table, styles.border)}>
        <thead className={styles.tableHead}>
          <tr className={styles.border}>
            <th className={styles.heading}> </th>
            <th className={styles.heading}>Lunes</th>
            <th className={styles.heading}>Martes</th>
            <th className={styles.heading}>Miercoles</th>
            <th className={styles.heading}>Jueves</th>
            <th className={styles.heading}>Viernes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.titleHour}>7:00 AM</td>
            <Cell  value="1-7" />
            <Cell  value="2-7" />
            <Cell  value="3-7" />
            <Cell  value="4-7" />
            <Cell  value="5-7" />
          </tr>
          <tr>
            <td className={styles.titleHour}>8:00 AM</td>
            <Cell  value="1-8" />
            <Cell  value="2-8" />
            <Cell  value="3-8" />
            <Cell  value="4-8" />
            <Cell  value="5-8" />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>9:00 AM</td>
            <Cell  value="1-9" />
            <Cell  value="2-9" />
            <Cell  value="3-9" />
            <Cell  value="4-9" />
            <Cell  value="5-9" />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>10:00 AM</td>
            <Cell  value="1-10" />
            <Cell  value="2-10" />
            <Cell  value="3-10" />
            <Cell  value="4-10" />
            <Cell  value="5-10" />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>11:00 AM</td>
            <Cell  value="1-11" />
            <Cell  value="2-11" />
            <Cell  value="3-11" />
            <Cell  value="4-11" />
            <Cell  value="5-11" />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>12:00 AM</td>
            <Cell  value="1-12" />
            <Cell  value="2-12" />
            <Cell  value="3-12" />
            <Cell  value="4-12" />
            <Cell  value="5-12" />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>01:00 PM</td>
            <Cell  value="1-13" />
            <Cell  value="2-13" />
            <Cell  value="3-13" />
            <Cell  value="4-13" />
            <Cell  value="5-13" />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>02:00 PM</td>
            <Cell  value="1-14" />
            <Cell  value="2-14" />
            <Cell  value="3-14" />
            <Cell  value="4-14" />
            <Cell  value="5-14" />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>03:00 PM</td>
            <Cell  value="1-15" />
            <Cell  value="2-15" />
            <Cell  value="3-15" />
            <Cell  value="4-15" />
            <Cell  value="5-15" />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>04:00 PM</td>
            <Cell  value="1-16" />
            <Cell  value="2-16" />
            <Cell  value="3-16" />
            <Cell  value="4-16" />
            <Cell  value="5-16" />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>05:00 PM</td>
            <Cell  value="1-17" />
            <Cell  value="2-17" />
            <Cell  value="3-17" />
            <Cell  value="4-17" />
            <Cell  value="5-17" />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>06:00 PM</td>
            <Cell  value="1-18" />
            <Cell  value="2-18" />
            <Cell  value="3-18" />
            <Cell  value="4-18" />
            <Cell  value="5-18" />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>07:00 PM</td>
            <Cell  value="1-19" />
            <Cell  value="2-19" />
            <Cell  value="3-19" />
            <Cell  value="4-19" />
            <Cell  value="5-19" />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MyCalendar;
