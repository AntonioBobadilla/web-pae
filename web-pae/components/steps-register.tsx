import styles from '../css/components/StepsRegister.module.css';
import cx from 'classnames'

const StepsRegister = () => {
  // creo un Stateless Functional Component

  return (
    <div className={styles.stepsRegisterWrap}>
      <div className={styles.item}>
        <div  className={cx(styles.icon, styles.completed)}>
          <i className="bi bi-person"></i>
        </div>
        <p className={cx(styles.itemText, styles.active)}>Datos personales</p>
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
          <i className="bi bi-stack"></i>
        </div>
        <p className={cx(styles.itemText)}>Unidades de formación</p>
      </div>
    </div>
  );
};

export default StepsRegister; // exporto la función