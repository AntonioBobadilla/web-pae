import cx from 'classnames';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import styles from '../css/components/calendar-full.module.css';
import Cell from './frontend-calendar-cellComponent';

interface MyCalendarProps {
  schedulesToShow: any;
  period: any;
  eventObj: any;
  setEventObj: any;
}

const CalendarMax = ({
  schedulesToShow,
  period,
  eventObj,
  setEventObj
}: MyCalendarProps) => {
  const [loop, setLoop] = useState<any>(false);

  const { t } = useTranslation('assigned-tutoring');

  setTimeout(() => {
    if (schedulesToShow.length != 0 && loop == false) {
      showSchedules(schedulesToShow);
      setLoop(true);
    }
  }, 1000);

  // funcion que cambia el color de la celda.
  const changeColorOfCell = (cell: any) => {
    if (cell != null) {
      cell.style.background = '#039BE5';
      cell.style.border = 'none';
    }
  };

  // función que al dar click en una celda la encuentra dado un string perteneciente al dia y hora.
  const findSelectedCell = (id: any) => {
    let Cell = null;
    const cells = document.querySelectorAll('.data');
    cells.forEach((cell) => {
      const attr = cell.getAttribute('id');
      if (id == attr) {
        Cell = cell;
        return cell;
      }
    });
    return Cell;
  };

  // funcion que cambia el color de la celda.
  const resetColorOfCell = (cell: any) => {
    cell.style.background = 'none';
    cell.style.border = '1px solid #f1f1f1';
  };

  // función que maneja el click en las celdas.
  const showSchedules = (scheduleObj: any) => {
    scheduleObj.forEach(
      (item: {
        day_week: { toString: () => any };
        hour: { toString: () => any };
      }) => {
        let dayWeek = item.day_week.toString();
        let hour = item.hour.toString();
        let id = dayWeek + '-' + hour + '-' + period;
        const cell = findSelectedCell(id);
        changeColorOfCell(cell);
      }
    );
  };

  const checkDuplicates = (id: string) => {
    const isFound = eventObj.some((element: { id: any }) => {
      if (element.id === id) return true;
    });
    return isFound;
  };

  const deleteEventFromObj = (id: string) => {
    const indexOfObject = eventObj.findIndex(
      (object: { id: any }) => object.id === id
    );
    const copyOfEventObj = [...eventObj];
    copyOfEventObj.splice(indexOfObject, 1);
    setEventObj(copyOfEventObj);
  };

  const findSelectedCell2 = (data: string) => {
    const splittedData = data.split('-');
    const diaSelected = splittedData[0];
    const horaSelected = splittedData[1];
    const periodoSelected = splittedData[2];

    let Cell = null;
    const cells = document.querySelectorAll('.data');
    cells.forEach((cell: any) => {
      const attr: any = cell.getAttribute('id').split('-');
      const dia = attr[0];
      const hora = attr[1];
      const periodo = attr[2];

      if (
        diaSelected == dia &&
        horaSelected == hora &&
        periodoSelected == periodo
      ) {
        Cell = cell;
        return cell;
      }
    });
    return {
      dia: parseInt(diaSelected),
      hora: parseInt(horaSelected),
      cell: Cell
    };
  };

  // función que maneja el click en las celdas.
  const getClick = (data: any) => {
    const { dia, hora, cell } = findSelectedCell2(data);
    const idData = `${dia}-${hora}-${period}`;
    if (!checkDuplicates(idData)) {
      setEventObj((eventObj: any) => [
        ...eventObj,
        { period: period, day_week: dia, hour: hora, id: idData }
      ]);
      changeColorOfCell(cell);
    } else {
      deleteEventFromObj(idData);
      resetColorOfCell(cell);
    }
  };

  return (
    <div className={styles.wrapper}>
      <table className={cx(styles.table, styles.border)}>
        <thead className={styles.tableHead}>
          <tr className={styles.border}>
            <th className={styles.heading} style={{ color: 'transparent' }}>
              xxxxxxxxx
            </th>
            <th className={styles.heading}>{t('Monday')}</th>
            <th className={styles.heading}>{t('Tuesday')}</th>
            <th className={styles.heading}>{t('Wednesday')}</th>
            <th className={styles.heading}>{t('Thursday')}</th>
            <th className={styles.heading}>{t('Friday')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.titleHour}>7:00 AM</td>
            <Cell function={getClick} value={'0-7-' + period} />
            <Cell function={getClick} value={'1-7-' + period} />
            <Cell function={getClick} value={'2-7-' + period} />
            <Cell function={getClick} value={'3-7-' + period} />
            <Cell function={getClick} value={'4-7-' + period} />
          </tr>
          <tr>
            <td className={styles.titleHour}>8:00 AM</td>
            <Cell function={getClick} value={'0-8-' + period} />
            <Cell function={getClick} value={'1-8-' + period} />
            <Cell function={getClick} value={'2-8-' + period} />
            <Cell function={getClick} value={'3-8-' + period} />
            <Cell function={getClick} value={'4-8-' + period} />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>9:00 AM</td>
            <Cell function={getClick} value={'0-9-' + period} />
            <Cell function={getClick} value={'1-9-' + period} />
            <Cell function={getClick} value={'2-9-' + period} />
            <Cell function={getClick} value={'3-9-' + period} />
            <Cell function={getClick} value={'4-9-' + period} />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>10:00 AM</td>
            <Cell function={getClick} value={'0-10-' + period} />
            <Cell function={getClick} value={'1-10-' + period} />
            <Cell function={getClick} value={'2-10-' + period} />
            <Cell function={getClick} value={'3-10-' + period} />
            <Cell function={getClick} value={'4-10-' + period} />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>11:00 AM</td>
            <Cell function={getClick} value={'0-11-' + period} />
            <Cell function={getClick} value={'1-11-' + period} />
            <Cell function={getClick} value={'2-11-' + period} />
            <Cell function={getClick} value={'3-11-' + period} />
            <Cell function={getClick} value={'4-11-' + period} />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>12:00 AM</td>
            <Cell function={getClick} value={'0-12-' + period} />
            <Cell function={getClick} value={'1-12-' + period} />
            <Cell function={getClick} value={'2-12-' + period} />
            <Cell function={getClick} value={'3-12-' + period} />
            <Cell function={getClick} value={'4-12-' + period} />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>01:00 PM</td>
            <Cell function={getClick} value={'0-13-' + period} />
            <Cell function={getClick} value={'1-13-' + period} />
            <Cell function={getClick} value={'2-13-' + period} />
            <Cell function={getClick} value={'3-13-' + period} />
            <Cell function={getClick} value={'4-13-' + period} />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>02:00 PM</td>
            <Cell function={getClick} value={'0-14-' + period} />
            <Cell function={getClick} value={'1-14-' + period} />
            <Cell function={getClick} value={'2-14-' + period} />
            <Cell function={getClick} value={'3-14-' + period} />
            <Cell function={getClick} value={'4-14-' + period} />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>03:00 PM</td>
            <Cell function={getClick} value={'0-15-' + period} />
            <Cell function={getClick} value={'1-15-' + period} />
            <Cell function={getClick} value={'2-15-' + period} />
            <Cell function={getClick} value={'3-15-' + period} />
            <Cell function={getClick} value={'4-15-' + period} />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>04:00 PM</td>
            <Cell function={getClick} value={'0-16-' + period} />
            <Cell function={getClick} value={'1-16-' + period} />
            <Cell function={getClick} value={'2-16-' + period} />
            <Cell function={getClick} value={'3-16-' + period} />
            <Cell function={getClick} value={'4-16-' + period} />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>05:00 PM</td>
            <Cell function={getClick} value={'0-17-' + period} />
            <Cell function={getClick} value={'1-17-' + period} />
            <Cell function={getClick} value={'2-17-' + period} />
            <Cell function={getClick} value={'3-17-' + period} />
            <Cell function={getClick} value={'4-17-' + period} />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>06:00 PM</td>
            <Cell function={getClick} value={'0-18-' + period} />
            <Cell function={getClick} value={'1-18-' + period} />
            <Cell function={getClick} value={'2-18-' + period} />
            <Cell function={getClick} value={'3-18-' + period} />
            <Cell function={getClick} value={'4-18-' + period} />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>07:00 PM</td>
            <Cell function={getClick} value={'0-19-' + period} />
            <Cell function={getClick} value={'1-19-' + period} />
            <Cell function={getClick} value={'2-19-' + period} />
            <Cell function={getClick} value={'3-19-' + period} />
            <Cell function={getClick} value={'4-19-' + period} />
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['assigned-tutoring']))
    }
  };
}

export default CalendarMax;
