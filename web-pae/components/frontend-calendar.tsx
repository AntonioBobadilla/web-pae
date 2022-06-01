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

    // funcion que cambia el color de la celda.
    const resetColorOfCell = (cell) => {
      cell.style.background = 'none';
      cell.style.border = '1px solid #f1f1f1';
    };

    // función que regresa solo números enteros de un string
    const getOnlyNumbers = (string) => {
      return parseInt(string.replace(/\D/g, ""));
    }

  // función que recibe los valores del formulario inicial.
  const getValues = (dia, inicio, fin) => {
    console.log(dia, inicio, fin);
    inicio = getOnlyNumbers(inicio);
    fin = getOnlyNumbers(fin);
    setEventObj((eventObj) => [...eventObj, { dia, inicio , fin, id: dia+inicio+fin  }]);
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

  const checkDuplicates = (id) =>  {
    let isFound = eventObj.some(element => {
      if (element.id === id)
        return true;
    })
    return isFound;
  }

  const deleteEventFromObj = (id) => {
    const indexOfObject = eventObj.findIndex(object => {
      return object.id === id;
    });
    eventObj.splice(indexOfObject, 1);
  }

  // función que maneja el click en las celdas.
  const getClick = (data) => {
    const {dia, inicio, fin, cell} = findSelectedCell(data);
    let idData = dia+inicio+fin;
    let inicioNumber = getOnlyNumbers(inicio);
    let finNumber = getOnlyNumbers(fin);
    if( !checkDuplicates(idData) ){
      setEventObj((eventObj) => [...eventObj, { dia, inicio:inicioNumber, fin:finNumber, id: idData }]);
      changeColorOfCell(cell);
    } else {
      deleteEventFromObj(idData);
      resetColorOfCell(cell);
    }
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
        <tr>
            <td className="titleHour">7:00 AM</td>
            <Cell function={getClick} value="lunes 7am" />
            <Cell function={getClick} value="martes 7am" />
            <Cell function={getClick} value="miercoles 7am" />
            <Cell function={getClick} value="jueves 7am" />
            <Cell function={getClick} value="viernes 7am" />
          </tr>
          <tr>
            <td className="titleHour">8:00 AM</td>
            <Cell function={getClick} value="lunes 8am" />
            <Cell function={getClick} value="martes 8am" />
            <Cell function={getClick} value="miercoles 8am" />
            <Cell function={getClick} value="jueves 8am" />
            <Cell function={getClick} value="viernes 8am" />
          </tr>
          <tr className={styles.border}>
            <td className="titleHour">9:00 AM</td>
            <Cell function={getClick} value="lunes 9am" />
            <Cell function={getClick} value="martes 9am" />
            <Cell function={getClick} value="miercoles 9am" />
            <Cell function={getClick} value="jueves 9am" />
            <Cell function={getClick} value="viernes 9am" />
          </tr>
          <tr className={styles.border}>
            <td className="titleHour">10:00 AM</td>
            <Cell function={getClick} value="lunes 10am" />
            <Cell function={getClick} value="martes 10am" />
            <Cell function={getClick} value="miercoles 10am" />
            <Cell function={getClick} value="jueves 10am" />
            <Cell function={getClick} value="viernes 10am" />
          </tr>
          <tr className={styles.border}>
            <td className="titleHour">11:00 AM</td>
            <Cell function={getClick}  value="lunes 11am" />
            <Cell function={getClick} value="martes 11am" />
            <Cell function={getClick} value="miercoles 11am" />
            <Cell function={getClick} value="jueves 11am" />
            <Cell function={getClick} value="viernes 11am" />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MyCalendar;
