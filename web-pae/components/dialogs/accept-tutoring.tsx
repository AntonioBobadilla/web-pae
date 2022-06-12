import React from 'react';
import styles from '../../css/components/dialogs/modify-password.module.css';
import registerStyles from '../../css/register.module.css';
import ClosablePopup from '../closable-popup';

type ModifyLanguageProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const acceptTutoring = ({ visible, setVisible }: ModifyLanguageProps) => {
  const onClickSave = () => {
    setVisible(false);
  };
  return (
    <ClosablePopup
      title="Tutoría aceptada"
      line
      visible={visible}
      style={styles.container}
      setVisible={setVisible}
    >
      <div className={registerStyles.languageOptions}>
        <h3 style={{ marginBottom: '50px', textAlign: 'center' }}>
          La asesoría fue aceptada. Los alumnos serán notificados{' '}
        </h3>
      </div>
    </ClosablePopup>
  );
};

export default acceptTutoring;
