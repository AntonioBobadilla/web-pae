import styles from '../css/components/calendar.module.css';
import cx from 'classnames'
import Cell from '../components/frontend-calendar-cellComponent';
import AddEvent from './front-calendar-addEvent';
import { useEffect, useState } from 'react';
import { start } from 'repl';



const MyCalendar = () => {

  const [eventObj, setEventObj] = useState([]);
  const [helper, setHelper] = useState();

  useEffect(() => {
    const {startCell, finishCell} = findStartAndEndCells();
    if (startCell != null) {
      getCellsBetween(startCell, finishCell);
      console.log(eventObj)
    }

  },[eventObj])

  const getCellsBetween = (startCell, finishCell) => {
    let start = startCell.getAttribute('id').split(" ");
    let dia = start[0];
    let horaInicio = start[1];

    let end = finishCell.getAttribute('id').split(" ");
    let horaFin = end[1];

    let numInicio = parseInt(horaInicio.match(/(\d+)/)[0]);
    let numFinal = parseInt(horaFin.match(/(\d+)/)[0]);

    let numberCycles = numFinal - numInicio;

    if (numberCycles == 1) { changeColorOfCell(startCell) } else { 
      for(let i = 0; i <= numberCycles; i++){
        let formatoBusqueda = dia+" "+(numInicio+i)+"am"; // cambiar am por el valor real dinamico
        let suma = (numInicio+i)
        let cell = document.getElementById(formatoBusqueda);
        changeColorOfCell(cell)
      }
    }
  }

  const findStartAndEndCells = () => {

    let startCell = null;
    let finishCell = null;

    let cells = document.querySelectorAll('.data');
    eventObj.forEach(obj => {
      cells.forEach(cell => {
        let attr = cell.getAttribute('id').split(" ");
        let dia = attr[0];
        let hora = attr[1];
        if (obj.dia == dia && obj.inicio == hora){
          startCell = cell;
        }
        if (obj.dia == dia && obj.fin == hora){
          finishCell = cell;
        }
       })
    })
    return {startCell, finishCell}
  }

  const changeColorOfCell = (cell) => {
      cell.style.background = 'tomato';
  }

  const getValues = (dia,inicio,fin) => {
    console.log(dia,inicio,fin)
    setEventObj(eventObj => [...eventObj, {dia,inicio,fin}]);
  }

    return (
        <div className={styles.wrapper}>
          <AddEvent function={getValues} />
            <table className={cx(styles.table, styles.border)}>
              <thead className={styles.tableHead}>
                <tr className={styles.border}>
                  <th className={styles.heading}>  </th>
                  <th className={styles.heading}>Lunes</th>
                  <th className={styles.heading}>Martes</th>
                  <th className={styles.heading}>Miercoles</th>
                  <th className={styles.heading}>Jueves</th>
                  <th className={styles.heading}>Viernes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='titleHour'>7:00 AM</td>
                  <Cell value='lunes 7am' />
                  <Cell value='martes 7am' />
                  <Cell value='miercoles 7am' />
                  <Cell value='jueves 7am' />
                  <Cell value='viernes 7am' />
                </tr>
                <tr>
                  <td className='titleHour'>8:00 AM</td>
                  <Cell value='lunes 8am' />
                  <Cell value='martes 8am' />
                  <Cell value='miercoles 8am' />
                  <Cell value='jueves 8am' />
                  <Cell value='viernes 8am' />
                </tr>
                <tr className={styles.border}>
                  <td className='titleHour'>9:00 AM</td>
                  <Cell value='lunes 9am' />
                  <Cell value='martes 9am' />
                  <Cell value='miercoles 9am' />
                  <Cell value='jueves 9am' />
                  <Cell value='viernes 9am' />
                </tr>
                <tr className={styles.border}>
                  <td className='titleHour'>10:00 AM</td>
                  <Cell value='lunes 10am' />
                  <Cell value='martes 10am' />
                  <Cell value='miercoles 10am' />
                  <Cell value='jueves 10am' />
                  <Cell value='viernes 10am' />
                </tr>
                <tr className={styles.border}>
                  <td className='titleHour'>11:00 AM</td>
                  <Cell value='lunes 11am' />
                  <Cell value='martes 11am' />
                  <Cell value='miercoles 11am' />
                  <Cell value='jueves 11am' />
                  <Cell value='viernes 11am' />
                </tr>
              </tbody>
            </table>
        </div>
    )
}

export default MyCalendar;