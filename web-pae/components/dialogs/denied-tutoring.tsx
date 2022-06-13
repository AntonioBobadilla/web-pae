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

const DeniedTutoring = ({
  visible,
  setVisible,
  setConfirmDelete
}: DeniedTuteeProps) => {
  const { t } = useTranslation('admin-tutorings-requests');
  const confirm = () => {
    setConfirmDelete(true);
    setVisible(false);
  };

  const onClickSave = () => {
    setVisible(false);
  };
  return (
    <ClosablePopup
      title={'Reject request'}
      line
      visible={visible}
      style={styles.container}
      setVisible={setVisible}
    >
      <div className={styles.wrapper}>
        <h2 className={styles.title}>
          {t('Are you sure you want to reject the request')}
        </h2>
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

export default DeniedTutoring;
