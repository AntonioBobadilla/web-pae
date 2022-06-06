import React from 'react';
import styles from '../../css/components/dialogs/modify-password.module.css';
import registerStyles from '../../css/register.module.css';
import ButtonTemplate from '../button-template';
import ClosablePopup from '../closable-popup';
import ToggleButton from '../toggle-button';

type ModifyLanguageProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const AcceptTutee = ({ visible, setVisible }: ModifyLanguageProps) => {
  const onClickSave = () => {
    setVisible(false);
  };
  return (
    <ClosablePopup
      title="Tutor aceptado"
      line
      visible={visible}
      style={styles.container}
      setVisible={setVisible}
    >
      <div className={registerStyles.languageOptions}>
        <p style={{'marginBottom':'50px'}}>¡Tutor aceptado con éxito!</p>
      </div>
    </ClosablePopup>
  );
};

export default AcceptTutee;
