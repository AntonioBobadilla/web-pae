import cx from 'classnames';
import Link from 'next/link';
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
}

const StepsStudent = ({ currentRoute }: StepsStudentProps) => (
  // creo un Stateless Functional Component

  <div className={styles.stepsRegisterWrap}>
    <Link
      href={{
        pathname: '/student/schedule-tutoring/',
        query: { step: SUBJECT }
      }}
      passHref
    >
      <div className={styles.item} role="button" tabIndex={0}>
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
    </Link>

    <div className={styles.dots}>
      <div className={cx(styles.icon)}>
        <i className="bi bi-three-dots" />
      </div>
    </div>
    <Link
      href={{
        pathname: '/student/schedule-tutoring/',
        query: { step: AVAILABLE_TUTORINGS }
      }}
      passHref
    >
      <div className={styles.item} role="button" tabIndex={0}>
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
    </Link>
    <div className={styles.dots}>
      <div className={cx(styles.icon)}>
        <i className="bi bi-three-dots" />
      </div>
    </div>
    <Link
      href={{
        pathname: '/student/schedule-tutoring/',
        query: { step: TOPIC }
      }}
      passHref
    >
      <div className={styles.item} role="button" tabIndex={0}>
        <div
          className={cx(styles.icon, currentRoute === TOPIC && styles.active)}
        >
          <i className="bi bi-folder" />
        </div>
        <p
          className={cx(
            styles.itemText,
            currentRoute === TOPIC && styles.active
          )}
        >
          Tema
        </p>
      </div>
    </Link>
    <div className={styles.dots}>
      <div className={cx(styles.icon)}>
        <i className="bi bi-three-dots" />
      </div>
    </div>
    <Link
      href={{
        pathname: '/student/schedule-tutoring/',
        query: { step: CONFIRMATION }
      }}
      passHref
    >
      <div className={styles.item} role="button" tabIndex={0}>
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
    </Link>
  </div>
);
export default StepsStudent; // exporto la función
