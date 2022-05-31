import Styles from '../css/components/subject-form.module.css';

const SubjectForm = () => {
  return (
    <div className={Styles.main}>
      <input type="text" placeholder="CLAVE*" className={Styles.input}></input>
      <input type="text" placeholder="NOMBRE*" className={Styles.input}></input>
    </div>
  );
};

export default SubjectForm;
