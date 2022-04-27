import Link from 'next/link';
import React from 'react';
import confirmPopupStyles from '../css/components/confirmPopup.module.css';

const ConfirmationPopup = (props) => {
  // creo un Stateless Functional Component
  const url = props.url;

  return (
    <div className={confirmPopupStyles.containerPopup}>
      <img className={confirmPopupStyles.logo} src="/images/logo.png" />
      <h2 className={confirmPopupStyles.title}> ¡Registro completado! </h2>
      <p className={confirmPopupStyles.paragraph}>
        Recibirás un correo cuando sea aprobado tu perfil
      </p>
      <div className={confirmPopupStyles.icon}>
        <i className="bi bi-calendar-check"></i>
      </div>
      <Link href={url}>
        <a className={confirmPopupStyles.linkStyle}>
          Regresar a página de inicio
        </a>
      </Link>
    </div>
  );
};

export default ConfirmationPopup; // exporto la función
