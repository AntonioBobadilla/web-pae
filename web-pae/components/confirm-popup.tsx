import Link from 'next/link';
import React from 'react';
import confirmPopupStyles from '../css/components/confirmPopup.module.css';
import Popup from './popup';
import { useTranslation } from 'next-i18next'; 

interface ConfirmationPopupProps {
  url: string;
}

const ConfirmationPopup = (props: ConfirmationPopupProps) => {
  // creo un Stateless Functional Component
  const { url } = props;
  const { t } = useTranslation('tutor-confirmation');

  return (
    <Popup title={t('Registration completed')} line={false} style={confirmPopupStyles.modal}>
      <p className={confirmPopupStyles.paragraph}>
      {t('You will receive an email')}
      </p>
      <div className={confirmPopupStyles.icon}>
        <i className="bi bi-calendar-check" />
      </div>
      <Link href={url}>
        <a className={confirmPopupStyles.linkStyle}>
        {t('Return to home page')}
        </a>
      </Link>
    </Popup>
  );
};

export default ConfirmationPopup; // exporto la función
