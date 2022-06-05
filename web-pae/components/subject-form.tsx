import Styles from '../css/components/subject-form.module.css';
import SearchBar from './search-bar';

const SubjectForm = () => {
  return (
    <div className={Styles.main}>
      <input type="text" placeholder="CLAVE*" className={Styles.input}></input>
      <input type="text" placeholder="NOMBRE*" className={Styles.input}></input>
      <button className={Styles.button}>Agregar</button>
    </div>
  );
};

export default SubjectForm;
