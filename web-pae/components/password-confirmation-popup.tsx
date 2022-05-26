/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import React from 'react';
import styles from '../css/components/password-confirmation-popup.module.css';
import Popup from './popup';

const PasswordConfirmationPopup = () => (
  <Popup title="" line={false} style={styles.modal}>
    <span className={styles.text}>
      Recibirás un correo con las instrucciones para recuperar tu contraseña
    </span>
    <div className={styles.icon}>
      <i className="bi bi-calendar-check" />
    </div>
    <div className={styles.links}>
      <Link href="/student/login" passHref>
        <a>Regresar a página de inicio</a>
      </Link>
    </div>
  </Popup>
);

export default PasswordConfirmationPopup;
