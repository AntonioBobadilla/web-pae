import cx from 'classnames';
import Link from 'next/link';
import React from 'react';
import styles from '../css/components/stepsRegister.module.css';
import { REGISTER, SCHEDULE, SUBJECTS } from '../helpers/steps';

interface StepRegisterProps {
  currentRoute: string | string[] | undefined;
}

const StepsRegister = ({ currentRoute }: StepRegisterProps) => (
  // creo un Stateless Functional Component

  <div className={styles.stepsRegisterWrap}>
    <Link
      href={{
        pathname: '/tutor/registration/',
        query: { step: REGISTER }
      }}
      passHref
    >
      <div
        className={styles.item}
        // onClick={() => handleStep(REGISTER)}
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
    </Link>

    <div className={styles.dots}>
      <div className={cx(styles.icon)}>
        <i className="bi bi-three-dots" />
        <i className="bi bi-three-dots" />
      </div>
    </div>

    <Link
      href={{
        pathname: '/tutor/registration/',
        query: { step: SCHEDULE }
      }}
      passHref
    >
      <div
        className={styles.item}
        // onClick={() => handleStep(SCHEDULE)}
        role="button"
        tabIndex={0}
      >
        <div
          className={cx(
            styles.icon,
            currentRoute === SCHEDULE && styles.active
          )}
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
    </Link>
    <div className={styles.dots}>
      <div className={cx(styles.icon)}>
        <i className="bi bi-three-dots" />
        <i className="bi bi-three-dots" />
      </div>
    </div>
    <Link
      href={{
        pathname: '/tutor/registration/',
        query: { step: SUBJECTS }
      }}
      passHref
    >
      <div
        className={styles.item}
        // onClick={() => handleStep(SUBJECTS)}
        role="button"
        tabIndex={0}
      >
        <div
          className={cx(
            styles.icon,
            currentRoute === SUBJECTS && styles.active
          )}
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
    </Link>
  </div>
);

export default StepsRegister;
