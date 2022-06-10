import cx from 'classnames';
import styles from '../css/components/calendar-view.module.css';
import Cell from './frontend-calendar-cellComponentView';

interface MyCalendarProps {
  changeColorOfCell: (cell: any) => void;
  schedulesToShow: any;
  period: any;
}

const MyCalendar = ({
  changeColorOfCell,
  schedulesToShow,
  period
}: MyCalendarProps) => {
  setTimeout(() => {
    showSchedules(schedulesToShow);
  }, 1000);

  // función que al dar click en una celda la encuentra dado un string perteneciente al dia y hora.
  const findSelectedCell = (id: string | null) => {
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

  // función que maneja el click en las celdas.
  const showSchedules = (scheduleObj: any[]) => {
    scheduleObj.forEach((item) => {
      let dayWeek = item.day_week.toString();
      let hour = item.hour.toString();
      let id = dayWeek + '-' + hour + '-' + period;
      const cell = findSelectedCell(id);
      changeColorOfCell(cell);
    });
  };

  return (
    <div className={styles.wrapper}>
      <table className={cx(styles.table, styles.border)}>
        <thead className={styles.tableHead}>
          <tr className={styles.border}>
            <th className={styles.heading} style={{ color: 'transparent' }}>
              xxxxxxxxx
            </th>
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
            <Cell value={'1-7-' + period} />
            <Cell value={'2-7-' + period} />
            <Cell value={'3-7-' + period} />
            <Cell value={'4-7-' + period} />
            <Cell value={'5-7-' + period} />
          </tr>
          <tr>
            <td className={styles.titleHour}>8:00 AM</td>
            <Cell value={'1-8-' + period} />
            <Cell value={'2-8-' + period} />
            <Cell value={'3-8-' + period} />
            <Cell value={'4-8-' + period} />
            <Cell value={'5-8-' + period} />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>9:00 AM</td>
            <Cell value={'1-9-' + period} />
            <Cell value={'2-9-' + period} />
            <Cell value={'3-9-' + period} />
            <Cell value={'4-9-' + period} />
            <Cell value={'5-9-' + period} />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>10:00 AM</td>
            <Cell value={'1-10-' + period} />
            <Cell value={'2-10-' + period} />
            <Cell value={'3-10-' + period} />
            <Cell value={'4-10-' + period} />
            <Cell value={'5-10-' + period} />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>11:00 AM</td>
            <Cell value={'1-11-' + period} />
            <Cell value={'2-11-' + period} />
            <Cell value={'3-11-' + period} />
            <Cell value={'4-11-' + period} />
            <Cell value={'5-11-' + period} />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>12:00 AM</td>
            <Cell value={'1-12-' + period} />
            <Cell value={'2-12-' + period} />
            <Cell value={'3-12-' + period} />
            <Cell value={'4-12-' + period} />
            <Cell value={'5-12-' + period} />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>01:00 PM</td>
            <Cell value={'1-13-' + period} />
            <Cell value={'2-13-' + period} />
            <Cell value={'3-13-' + period} />
            <Cell value={'4-13-' + period} />
            <Cell value={'5-13-' + period} />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>02:00 PM</td>
            <Cell value={'1-14-' + period} />
            <Cell value={'2-14-' + period} />
            <Cell value={'3-14-' + period} />
            <Cell value={'4-14-' + period} />
            <Cell value={'5-14-' + period} />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>03:00 PM</td>
            <Cell value={'1-15-' + period} />
            <Cell value={'2-15-' + period} />
            <Cell value={'3-15-' + period} />
            <Cell value={'4-15-' + period} />
            <Cell value={'5-15-' + period} />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>04:00 PM</td>
            <Cell value={'1-16-' + period} />
            <Cell value={'2-16-' + period} />
            <Cell value={'3-16-' + period} />
            <Cell value={'4-16-' + period} />
            <Cell value={'5-16-' + period} />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>05:00 PM</td>
            <Cell value={'1-17-' + period} />
            <Cell value={'2-17-' + period} />
            <Cell value={'3-17-' + period} />
            <Cell value={'4-17-' + period} />
            <Cell value={'5-17-' + period} />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>06:00 PM</td>
            <Cell value={'1-18-' + period} />
            <Cell value={'2-18-' + period} />
            <Cell value={'3-18-' + period} />
            <Cell value={'4-18-' + period} />
            <Cell value={'5-18-' + period} />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>07:00 PM</td>
            <Cell value={'1-19-' + period} />
            <Cell value={'2-19-' + period} />
            <Cell value={'3-19-' + period} />
            <Cell value={'4-19-' + period} />
            <Cell value={'5-19-' + period} />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MyCalendar;
