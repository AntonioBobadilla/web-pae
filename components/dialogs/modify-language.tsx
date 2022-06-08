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

const ModifyLanguage = ({ visible, setVisible }: ModifyLanguageProps) => {
  const onClickSave = () => {
    setVisible(false);
  };
  return (
    <ClosablePopup
      title="Modificar idioma"
      line
      visible={visible}
      style={styles.container}
      setVisible={setVisible}
    >
      <div className={registerStyles.languageOptions}>
        <div className={registerStyles.toggle}>
          <ToggleButton flagType="/images/mxflag.png" desc="Español" />
        </div>
        <div className={registerStyles.toggle}>
          <ToggleButton flagType="/images/usaflag.png" desc="English" />
        </div>
      </div>
      <div className={styles.button}>
        <ButtonTemplate variant="confirm" onClick={() => onClickSave()}>
          GUARDAR
        </ButtonTemplate>
      </div>
    </ClosablePopup>
  );
};

export default ModifyLanguage;
