import { useState } from 'react';
import styles from '../css/components/addEventOnCalendar.module.css';

const addEvent = (props) => {
  // creo un Stateless Functional Component

  const [diaValue, setDiaValue] = useState('');
  const [inicioValue, setInicioValue] = useState('');
  const [finValue, setFinValue] = useState('');

  const handleDia = (e) => {
    setDiaValue(e.target.options[e.target.selectedIndex].value);
  };
  const handleInicio = (e) => {
    setInicioValue(e.target.options[e.target.selectedIndex].value);
  };
  const handleFin = (e) => {
    setFinValue(e.target.options[e.target.selectedIndex].value);
  };

  const handleSubmit = () => {
    props.function(diaValue, inicioValue, finValue);
  };

  return (
    <div className={styles.wrap}>
      <select
        className={styles.select}
        name="dia"
        id="dia"
        onChange={handleDia}
      >
        <option defaultValue="selected">Día</option>
        <option value="lunes">Lunes</option>
        <option value="martes">Martes</option>
        <option value="miercoles">Miercoles</option>
        <option value="jueves">Jueves</option>
        <option value="viernes">Viernes</option>
      </select>
      <select
        className={styles.select}
        name="horaInicio"
        id="horaInicio"
        onChange={handleInicio}
      >
        <option defaultValue="selected">Hora de inicio</option>
        <option value="7am">7:00 AM</option>
        <option value="8am">8:00 AM</option>
        <option value="9am">9:00 AM</option>
        <option value="10am">10:00 AM</option>
        <option value="11am">11:00 AM</option>
      </select>
      <select
        className={styles.select}
        name="horaFin"
        id="horaFin"
        onChange={handleFin}
      >
        <option defaultValue="selected">Hora de fin</option>
        <option value="7am">7:00 AM</option>
        <option value="8am">8:00 AM</option>
        <option value="9am">9:00 AM</option>
        <option value="10am">10:00 AM</option>
        <option value="11am">11:00 AM</option>
      </select>
      <button className={styles.addEventButton} onClick={handleSubmit}>
        Añadir
      </button>
    </div>
  );
};

export default addEvent; // exporto la función
