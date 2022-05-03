import cx from 'classnames';
import React from 'react';
import styles from '../css/components/stepsRegister.module.css';
import { REGISTER, SCHEDULE, SUBJECTS } from '../helpers/steps';

interface StepRegisterProps {
  handleStep: (step: string) => void;
}

const StepsRegister = ({ handleStep }: StepRegisterProps) => (
  // creo un Stateless Functional Component

  <div className={styles.stepsRegisterWrap}>
    <div
      className={styles.item}
      onClick={() => handleStep(REGISTER)}
      role="button"
      tabIndex={0}
    >
      <div className={cx(styles.icon, styles.completed)}>
        <i className="bi bi-person" />
      </div>
      <p className={cx(styles.itemText, styles.active)}>Datos personales</p>
    </div>
    <div className={styles.dots}>
      <div className={cx(styles.icon)}>
        <i className="bi bi-three-dots" />
        <i className="bi bi-three-dots" />
      </div>
    </div>
    <div
      className={styles.item}
      onClick={() => handleStep(SCHEDULE)}
      role="button"
      tabIndex={0}
    >
      <div className={cx(styles.icon)}>
        <i className="bi bi-calendar-week" />
      </div>
      <p className={cx(styles.itemText)}>Horario</p>
    </div>
    <div className={styles.dots}>
      <div className={cx(styles.icon)}>
        <i className="bi bi-three-dots" />
        <i className="bi bi-three-dots" />
      </div>
    </div>
    <div
      className={styles.item}
      onClick={() => handleStep(SUBJECTS)}
      role="button"
      tabIndex={0}
    >
      <div className={cx(styles.icon)}>
        <i className="bi bi-stack" />
      </div>
      <p className={cx(styles.itemText3)}>Unidades de formación</p>
      <p className={cx(styles.itemText2)}>Materias</p>
    </div>
  </div>
);

export default StepsRegister;
