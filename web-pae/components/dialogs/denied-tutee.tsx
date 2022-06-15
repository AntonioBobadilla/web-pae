import { useTranslation } from 'next-i18next';
import React from 'react';
import styles from '../../css/components/dialogs/denied-tutee.module.css';
import ButtonTemplate from '../button-template';
import ClosablePopup from '../closable-popup';

type DeniedTuteeProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  setConfirmDelete: (confirmDelete: boolean) => void;
};

const DeniedTutee = ({
  visible,
  setVisible,
  setConfirmDelete
}: DeniedTuteeProps) => {
  const confirm = () => {
    setConfirmDelete(true);
    setVisible(false);
  };
  const { t } = useTranslation('admin-home');

  const onClickSave = () => {
    setVisible(false);
  };
  return (
    <ClosablePopup
      title={t('Rejected tutor')}
      line
      visible={visible}
      style={styles.container}
      setVisible={setVisible}
    >
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{t('Are you sure to reject')}</h2>
        <div className={styles.buttons}>
          <div className={styles.button}>
            <ButtonTemplate variant="confirm" onClick={() => confirm()}>
              {t('YES')}
            </ButtonTemplate>
          </div>
          <div className={styles.button}>
            <ButtonTemplate variant="cancel" onClick={() => onClickSave()}>
              {t('NO, CANCEL')}
            </ButtonTemplate>
          </div>
        </div>
      </div>
    </ClosablePopup>
  );
};

export default DeniedTutee;
