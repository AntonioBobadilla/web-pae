/* eslint-disable @next/next/no-img-element */
import React from 'react';
import tStyles from '../css/components/toggleMenuStudent.module.css';

type ToggleMenuStudentProps = {
  onClickModifyPassword: () => void;
  onClickModifyLanguage: () => void;
};

const ToggleMenuStudent = ({
  onClickModifyPassword,
  onClickModifyLanguage
}: ToggleMenuStudentProps) => (
  <div className={tStyles.main}>
    <input type="checkbox" className={tStyles.toggler} />
    <div className={tStyles.buttonContainer} id="toggle">
      <img className={tStyles.icon} src="/icons/gear.svg" />
    </div>
    <div className={tStyles.overlay} id="overlay">
      <nav className={tStyles.overlayMenu}>
        <ul className={tStyles.ul}>
          <li className={tStyles.li}>
            <span
              role="button"
              className={tStyles.a}
              onClick={() => onClickModifyPassword()}
              tabIndex={-1}
            >
              Modificar contraseña
            </span>
          </li>
          <li className={tStyles.li}>
            <span
              role="button"
              className={tStyles.a}
              onClick={() => onClickModifyLanguage()}
              tabIndex={-1}
            >
              Modificar idioma
            </span>
          </li>
        </ul>
      </nav>
    </div>
  </div>
);

export default ToggleMenuStudent;
