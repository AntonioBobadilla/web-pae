import cx from 'classnames';
import React, { useEffect } from 'react';
import styles from '../css/components/calendar.module.css';
import AddEvent from './front-calendar-addEvent';
import Cell from './frontend-calendar-cellComponent';


interface MyCalendarProps {
  eventObj: never[];
  setEventObj: React.Dispatch<React.SetStateAction<never[]>>;
}

const MyCalendar = ({ eventObj, setEventObj }: MyCalendarProps) => {

  useEffect(() => {
    renderCellsDynamically();
  }, [])

  useEffect(() => {
    const { startCell, finishCell } = findStartAndEndCells();
    if (startCell != null) {
      getCellsBetween(startCell, finishCell);
      console.log(eventObj);
    }
  }, [eventObj]);



  // función que obtiene las celdas entre 2 horarios. Ej. celdas entre 7am y 10am.
  const getCellsBetween = (startCell, finishCell) => {
    const start = startCell.getAttribute('id').split(' ');
    const dia = start[0];
    const horaInicio = start[1];

    const end = finishCell.getAttribute('id').split(' ');
    const horaFin = end[1];

    const numInicio = parseInt(horaInicio.match(/(\d+)/)[0]);
    const numFinal = parseInt(horaFin.match(/(\d+)/)[0]);

    const numberCycles = numFinal - numInicio;

    if (numberCycles == 1) {
      changeColorOfCell(startCell);
    } else {
      for (let i = 0; i <= numberCycles; i++) {
        const formatoBusqueda = `${dia} ${numInicio + i}am`; // cambiar am por el valor real dinamico
        const suma = numInicio + i;
        const cell = document.getElementById(formatoBusqueda);
        changeColorOfCell(cell);
      }
    }
  };

  // función que dados 2 horarios en string encuentra dichas celdas pertenecientes a inicio y fin.
  const findStartAndEndCells = () => {
    let startCell = null;
    let finishCell = null;
    const cells = document.querySelectorAll('.data');
    eventObj.forEach((obj) => {
      cells.forEach((cell) => {
        const attr = cell.getAttribute('id').split(' ');
        const dia = attr[0];
        const hora = attr[1];
        if (obj.dia == dia && obj.inicio == hora) {
          startCell = cell;
        }
        if (obj.dia == dia && obj.fin == hora) {
          finishCell = cell;
        }
      });
    });
    return { startCell, finishCell };
  };

  // funcion que cambia el color de la celda.
  const changeColorOfCell = (cell) => {
    cell.style.background = '#039BE5';
    cell.style.border = 'none';
  };

  // función que recibe los valores del formulario inicial.
  const getValues = (dia, inicio, fin) => {
    console.log(dia, inicio, fin);
    setEventObj((eventObj) => [...eventObj, { dia, inicio, fin }]);
  };

  // función que obtiene la celda siguiente dado un string perteneciente al valor de una celda.
  const getNextCell = (data) => {

    let hora = parseInt(data.match(/\d+/g));
    hora = hora + 1;
    hora = hora.toString();
    let amOpm =  data.match(/[a-zA-Z]+/g);
    
    let newDate = hora+amOpm;

    return newDate;
  }
  
  // función que al dar click en una celda la encuentra dado un string perteneciente al dia y hora.
  const findSelectedCell = (data) => {

    const splittedData = data.split(' ');
    const diaSelected = splittedData[0];
    const horaSelected = splittedData[1]; 
    
    let Cell = null;
    let NextCell = null;
    const cells = document.querySelectorAll('.data');
      cells.forEach((cell) => {
        const attr = cell.getAttribute('id').split(' ');
        const dia = attr[0];
        const hora = attr[1];

        if (diaSelected == dia && horaSelected == hora) {
          Cell = cell;
          NextCell = getNextCell(horaSelected);
          return cell;
        }
      });
    return {dia:diaSelected, inicio:horaSelected, fin:NextCell,cell:Cell };
  };


  // función que maneja el click en las celdas.
  const getClick = (data) => {
    const {dia, inicio, fin, cell} = findSelectedCell(data);
    setEventObj((eventObj) => [...eventObj, { dia, inicio, fin }]);
    changeColorOfCell(cell);
    console.log(eventObj)
  };

  // función que renderiza la cantidad de celdas dependiendo de la configuración de horas dada.
  const renderCellsDynamically = () => {
    for(let i=0;i <= 1; i++ ){
      console.log(10+i)
    }
    return true;
  };

  return (
    <div className={styles.wrapper}>
      <AddEvent function={getValues} />
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
        </tbody>
      </table>
    </div>
  );
};

export default MyCalendar;
