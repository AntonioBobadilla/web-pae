import cx from 'classnames';
import React from 'react';
import styles from '../css/components/StepsStudent.module.css';
import {
  AVAILABLE_TUTORINGS,
  CONFIRMATION,
  SUBJECT,
  TOPIC
} from '../helpers/student-steps';

interface StepsStudentProps {
  currentRoute: string | string[] | undefined;
  isSubjectCompleted: boolean;
  isTopicCompleted: boolean;
  isAvailableTutoringCompleted: boolean;
  isConfirmationCompleted: boolean;
  handleStep: (step: string) => void;
}

const StepsStudent = ({
  currentRoute,
  isSubjectCompleted,
  isAvailableTutoringCompleted,
  isTopicCompleted,
  isConfirmationCompleted,
  handleStep
}: StepsStudentProps) => (
  // creo un Stateless Functional Component

  <div className={styles.stepsRegisterWrap}>
    <div
      className={cx(styles.item, isSubjectCompleted && styles.completed)}
      role="button"
      onClick={() => handleStep(SUBJECT)}
      tabIndex={0}
    >
      <div
        className={cx(
          styles.icon,
          (currentRoute === SUBJECT || currentRoute === undefined) &&
            styles.active
        )}
      >
        <i className="bi bi-stack" />
      </div>
      <p
        className={cx(
          styles.itemText,
          (currentRoute === SUBJECT || currentRoute === undefined) &&
            styles.active
        )}
      >
        Unidad de formación
      </p>
    </div>

    <div className={styles.dots}>
      <div className={cx(styles.icon)}>
        <i className="bi bi-three-dots" />
      </div>
    </div>

    <div
      className={cx(
        styles.item,
        isAvailableTutoringCompleted && styles.completed
      )}
      role="button"
      tabIndex={0}
      onClick={() => handleStep(AVAILABLE_TUTORINGS)}
    >
      <div
        className={cx(
          styles.icon,
          currentRoute === AVAILABLE_TUTORINGS && styles.active
        )}
      >
        <i className="bi bi-calendar-week" />
      </div>
      <p
        className={cx(
          styles.itemText,
          currentRoute === AVAILABLE_TUTORINGS && styles.active
        )}
      >
        Horario
      </p>
    </div>
    <div className={styles.dots}>
      <div className={cx(styles.icon)}>
        <i className="bi bi-three-dots" />
      </div>
    </div>

    <div
      className={cx(styles.item, isTopicCompleted && styles.completed)}
      role="button"
      tabIndex={0}
      onClick={() => handleStep(TOPIC)}
    >
      <div className={cx(styles.icon, currentRoute === TOPIC && styles.active)}>
        <i className="bi bi-folder" />
      </div>
      <p
        className={cx(styles.itemText, currentRoute === TOPIC && styles.active)}
      >
        Tema
      </p>
    </div>
    <div className={styles.dots}>
      <div className={cx(styles.icon)}>
        <i className="bi bi-three-dots" />
      </div>
    </div>

    <div
      className={cx(styles.item, isConfirmationCompleted && styles.completed)}
      role="button"
      tabIndex={0}
      onClick={() => handleStep(CONFIRMATION)}
    >
      <div
        className={cx(
          styles.icon,
          currentRoute === CONFIRMATION && styles.active
        )}
      >
        <i className="bi bi-check-lg" />
      </div>
      <p
        className={cx(
          styles.itemText,
          currentRoute === CONFIRMATION && styles.active
        )}
      >
        Confirmación
      </p>
    </div>
  </div>
);
export default StepsStudent; // exporto la función
