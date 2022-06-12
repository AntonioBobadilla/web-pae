import cx from 'classnames';
import React, { useEffect } from 'react';
import { Period } from 'store/types';
import styles from '../css/components/calendar.module.css';
import Cell from './frontend-calendar-cellComponent';

interface MyCalendarProps {
  eventObj: Period[];
  setEventObj: React.Dispatch<React.SetStateAction<Period[]>>;
  changeColorOfCell: (cell: any) => void;
  resetColorOfCell: (cell: any) => void;
}

const MyCalendar = ({
  eventObj,
  setEventObj,
  changeColorOfCell,
  resetColorOfCell
}: MyCalendarProps) => {
  useEffect(() => {
    renderCellsDynamically();
  }, []);

  useEffect(() => {
    const { startCell, finishCell } = findStartAndEndCells();
    if (startCell != null) {
      getCellsBetween(startCell, finishCell);
    }
  }, [eventObj]);

  // función que obtiene las celdas entre 2 horarios. Ej. celdas entre 7am y 10am.
  const getCellsBetween = (startCell: any, finishCell: any) => {
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
      cells.forEach((cell: any) => {
        const attr = cell.getAttribute('id').split(' ');
        const dia = attr[0];
        const hora = attr[1];
        if (obj.dia === dia && obj.inicio.toString() === hora) {
          startCell = cell;
        }
        if (obj.dia === dia && obj.fin.toString() === hora) {
          finishCell = cell;
        }
      });
    });
    return { startCell, finishCell };
  };

  // función que regresa solo números enteros de un string
  const getOnlyNumbers = (string: any) => parseInt(string.replace(/\D/g, ''));

  // // función que recibe los valores del formulario inicial.
  // const getValues = (dia, inicio, fin) => {
  //   console.log(dia, inicio, fin);
  //   inicio = getOnlyNumbers(inicio);
  //   fin = getOnlyNumbers(fin);
  //   setEventObj((eventObj) => [...eventObj, { dia, inicio , fin, id: dia+inicio+fin  }]);
  // };

  // función que obtiene la celda siguiente dado un string perteneciente al valor de una celda.
  const getNextCell = (data: any) => {
    let hora: any = parseInt(data.match(/\d+/g));
    hora += 1;
    hora = hora.toString();
    const amOpm = data.match(/[a-zA-Z]+/g);

    const newDate = hora + amOpm;

    return newDate;
  };

  // función que al dar click en una celda la encuentra dado un string perteneciente al dia y hora.
  const findSelectedCell = (data: any) => {
    const splittedData = data.split(' ');
    const diaSelected = splittedData[0];
    const horaSelected = splittedData[1];

    let Cell = null;
    let NextCell = null;
    const cells = document.querySelectorAll('.data');
    cells.forEach((cell:any) => {
      const attr: any = cell.getAttribute('id').split(' ');
      const dia = attr[0];
      const hora = attr[1];

      if (diaSelected == dia && horaSelected == hora) {
        Cell = cell;
        NextCell = getNextCell(horaSelected);
        return cell;
      }
    });
    return {
      dia: diaSelected,
      inicio: horaSelected,
      fin: NextCell,
      cell: Cell
    };
  };

  const checkDuplicates = (id: any) => {
    const isFound = eventObj.some((element) => {
      if (element.id === id) return true;
    });
    return isFound;
  };

  const deleteEventFromObj = (id: any) => {
    const indexOfObject = eventObj.findIndex((object) => object.id === id);
    const copyOfEventObj = [...eventObj];
    copyOfEventObj.splice(indexOfObject, 1);
    setEventObj(copyOfEventObj);
  };

  // función que maneja el click en las celdas.
  const getClick = (data: any) => {
    const { dia, inicio, fin, cell } = findSelectedCell(data);
    const idData = `${dia} ${inicio}`;
    const inicioNumber = getOnlyNumbers(inicio);
    const finNumber = getOnlyNumbers(fin);
    if (!checkDuplicates(idData)) {
      setEventObj((eventObj) => [
        ...eventObj,
        { dia, inicio: inicioNumber, fin: finNumber, id: idData }
      ]);
      changeColorOfCell(cell);
    } else {
      deleteEventFromObj(idData);
      resetColorOfCell(cell);
    }
    // console.log(eventObj);
  };

  // función que renderiza la cantidad de celdas dependiendo de la configuración de horas dada.
  const renderCellsDynamically = () => {
    for (let i = 0; i <= 1; i++) {
      // console.log(10 + i);
    }
    return true;
  };

  return (
    <div className={styles.wrapper}>
      {/* <AddEvent function={getValues} /> */}
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
            <Cell function={getClick} value="lunes 7am" />
            <Cell function={getClick} value="martes 7am" />
            <Cell function={getClick} value="miercoles 7am" />
            <Cell function={getClick} value="jueves 7am" />
            <Cell function={getClick} value="viernes 7am" />
          </tr>
          <tr>
            <td className={styles.titleHour}>8:00 AM</td>
            <Cell function={getClick} value="lunes 8am" />
            <Cell function={getClick} value="martes 8am" />
            <Cell function={getClick} value="miercoles 8am" />
            <Cell function={getClick} value="jueves 8am" />
            <Cell function={getClick} value="viernes 8am" />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>9:00 AM</td>
            <Cell function={getClick} value="lunes 9am" />
            <Cell function={getClick} value="martes 9am" />
            <Cell function={getClick} value="miercoles 9am" />
            <Cell function={getClick} value="jueves 9am" />
            <Cell function={getClick} value="viernes 9am" />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>10:00 AM</td>
            <Cell function={getClick} value="lunes 10am" />
            <Cell function={getClick} value="martes 10am" />
            <Cell function={getClick} value="miercoles 10am" />
            <Cell function={getClick} value="jueves 10am" />
            <Cell function={getClick} value="viernes 10am" />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>11:00 AM</td>
            <Cell function={getClick} value="lunes 11am" />
            <Cell function={getClick} value="martes 11am" />
            <Cell function={getClick} value="miercoles 11am" />
            <Cell function={getClick} value="jueves 11am" />
            <Cell function={getClick} value="viernes 11am" />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>12:00 AM</td>
            <Cell function={getClick} value="lunes 12am" />
            <Cell function={getClick} value="martes 12am" />
            <Cell function={getClick} value="miercoles 12am" />
            <Cell function={getClick} value="jueves 12am" />
            <Cell function={getClick} value="viernes 12am" />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>01:00 PM</td>
            <Cell function={getClick} value="lunes 13hr" />
            <Cell function={getClick} value="martes 13hr" />
            <Cell function={getClick} value="miercoles 13hr" />
            <Cell function={getClick} value="jueves 13hr" />
            <Cell function={getClick} value="viernes 13hr" />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>02:00 PM</td>
            <Cell function={getClick} value="lunes 14hr" />
            <Cell function={getClick} value="martes 14hr" />
            <Cell function={getClick} value="miercoles 14hr" />
            <Cell function={getClick} value="jueves 14hr" />
            <Cell function={getClick} value="viernes 14hr" />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>03:00 PM</td>
            <Cell function={getClick} value="lunes 15hr" />
            <Cell function={getClick} value="martes 15hr" />
            <Cell function={getClick} value="miercoles 15hr" />
            <Cell function={getClick} value="jueves 15hr" />
            <Cell function={getClick} value="viernes 15hr" />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>04:00 PM</td>
            <Cell function={getClick} value="lunes 16hr" />
            <Cell function={getClick} value="martes 16hr" />
            <Cell function={getClick} value="miercoles 16hr" />
            <Cell function={getClick} value="jueves 16hr" />
            <Cell function={getClick} value="viernes 16hr" />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>05:00 PM</td>
            <Cell function={getClick} value="lunes 17hr" />
            <Cell function={getClick} value="martes 17hr" />
            <Cell function={getClick} value="miercoles 17hr" />
            <Cell function={getClick} value="jueves 17hr" />
            <Cell function={getClick} value="viernes 17hr" />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>06:00 PM</td>
            <Cell function={getClick} value="lunes 18hr" />
            <Cell function={getClick} value="martes 18hr" />
            <Cell function={getClick} value="miercoles 18hr" />
            <Cell function={getClick} value="jueves 18hr" />
            <Cell function={getClick} value="viernes 18hr" />
          </tr>
          <tr className={styles.border}>
            <td className={styles.titleHour}>07:00 PM</td>
            <Cell function={getClick} value="lunes 19hr" />
            <Cell function={getClick} value="martes 19hr" />
            <Cell function={getClick} value="miercoles 19hr" />
            <Cell function={getClick} value="jueves 19hr" />
            <Cell function={getClick} value="viernes 19hr" />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MyCalendar;
