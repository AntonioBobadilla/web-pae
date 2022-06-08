import cx from 'classnames';
import React from 'react';
import styles from '../css/components/stepsRegister.module.css';
import { REGISTER, SCHEDULE, SUBJECTS } from '../helpers/steps';

interface StepRegisterProps {
  handleStep: (step: string) => void;
  currentRoute: string | string[] | undefined;
  isFormComplete: boolean;
  isCalendarComplete: boolean;
  isSubjectComplete: boolean;
}

const StepsRegister = ({
  currentRoute,
  handleStep,
  isFormComplete,
  isCalendarComplete,
  isSubjectComplete
}: StepRegisterProps) => (
  // creo un Stateless Functional Component

  <div className={styles.stepsRegisterWrap}>
    <div
      className={cx(styles.item, isFormComplete && styles.completed)}
      onClick={() => handleStep(REGISTER)}
      role="button"
      tabIndex={0}
    >
      <div
        className={cx(
          styles.icon,
          (currentRoute === REGISTER || currentRoute === undefined) &&
            styles.active
        )}
      >
        <i className="bi bi-person" />
      </div>
      <p
        className={cx(
          styles.itemText,
          (currentRoute === REGISTER || currentRoute === undefined) &&
            styles.active
        )}
      >
        Datos personales
      </p>
    </div>

    <div className={styles.dots}>
      <div className={cx(styles.icon)}>
        <i className="bi bi-three-dots" />
        <i className="bi bi-three-dots" />
      </div>
    </div>

    <div
      className={cx(styles.item, isCalendarComplete && styles.completed)}
      onClick={() => handleStep(SCHEDULE)}
      role="button"
      tabIndex={0}
    >
      <div
        className={cx(styles.icon, currentRoute === SCHEDULE && styles.active)}
      >
        <i className="bi bi-calendar-week" />
      </div>
      <p
        className={cx(
          styles.itemText,
          currentRoute === SCHEDULE && styles.active
        )}
      >
        Horario
      </p>
    </div>
    <div className={styles.dots}>
      <div className={cx(styles.icon)}>
        <i className="bi bi-three-dots" />
        <i className="bi bi-three-dots" />
      </div>
    </div>

    <div
      className={cx(styles.item, isSubjectComplete && styles.completed)}
      onClick={() => handleStep(SUBJECTS)}
      role="button"
      tabIndex={0}
    >
      <div
        className={cx(styles.icon, currentRoute === SUBJECTS && styles.active)}
      >
        <i className="bi bi-stack" />
      </div>
      <p
        className={cx(
          styles.itemText3,
          currentRoute === SUBJECTS && styles.active
        )}
      >
        Unidades de formación
      </p>
      <p
        className={cx(
          styles.itemText2,
          currentRoute === SUBJECTS && styles.active
        )}
      >
        Materias
      </p>
    </div>
  </div>
);

export default StepsRegister;
