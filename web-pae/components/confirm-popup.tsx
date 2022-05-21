import Link from 'next/link';
import React from 'react';
import confirmPopupStyles from '../css/components/confirmPopup.module.css';
import Popup from './popup';

interface ConfirmationPopupProps {
  url: string;
}

const ConfirmationPopup = (props: ConfirmationPopupProps) => {
  // creo un Stateless Functional Component
  const { url } = props;

  return (
    <Popup title=" ¡Registro completado! " line={false}>
      <p className={confirmPopupStyles.paragraph}>
        Recibirás un correo cuando sea aprobado tu perfil
      </p>
      <div className={confirmPopupStyles.icon}>
        <i className="bi bi-calendar-check" />
      </div>
      <Link href={url}>
        <a className={confirmPopupStyles.linkStyle}>
          Regresar a página de inicio
        </a>
      </Link>
    </Popup>
  );
};

export default ConfirmationPopup; // exporto la función
