import styles from '../css/components/StepsStudent.module.css';
import cx from 'classnames'

const StepsStudent = () => {
  // creo un Stateless Functional Component
 
  return (
    <div className={styles.stepsRegisterWrap}>
      <div className={styles.item}>
        <div  className={cx(styles.icon, styles.completed)}>
        <i className="bi bi-stack"></i>
        </div>
        <p className={cx(styles.itemText, styles.active)}>Unidad de formación</p>
      </div>
      <div className={styles.dots}>
        <div  className={cx(styles.icon)}>
          <i className="bi bi-three-dots"></i>
        </div>
      </div>
      <div className={styles.item}>
        <div  className={cx(styles.icon)}>
          <i className="bi bi-calendar-week"></i>
        </div>
        <p className={cx(styles.itemText)}>Horario</p>
      </div>
      <div  className={styles.dots}>
        <div  className={cx(styles.icon)}>
          <i className="bi bi-three-dots"></i>
        </div>
      </div>
      <div className={styles.item}>
        <div className={cx(styles.icon)}>
        <i className="bi bi-folder"></i>
        </div>
        <p className={cx(styles.itemText)}>Tema</p>
      </div>
      <div  className={styles.dots}>
        <div  className={cx(styles.icon)}>
          <i className="bi bi-three-dots"></i>
        </div>
      </div>
      <div className={styles.item}>
        <div className={cx(styles.icon)}>
            <i className="bi bi-check-lg"></i>
        </div>
        <p className={cx(styles.itemText)}>Confirmación</p>
      </div>
    </div>
  );
};

export default StepsStudent; // exporto la función