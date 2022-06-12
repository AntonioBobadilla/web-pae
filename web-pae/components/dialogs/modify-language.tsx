import React, { useState } from 'react';
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
  const [selectableEn, setSelectableEn] = useState(true);
  const [selectableEs, setSelectableEs] = useState(true);
  const [language, setLanguage] = useState('');

  const onClickSave = (language: string) => {
    setVisible(false);
    console.log('cambiar a: ', language);
  };
  const changeLanguageEn = () => {
    setSelectableEn(true);
    setSelectableEs(false);
    setLanguage('en');
  };
  const changeLanguageEs = () => {
    setSelectableEs(true);
    setSelectableEn(false);
    setLanguage('es');
  };
  return (
    <ClosablePopup
      title="Modificar idioma"
      line
      visible={visible}
      style={styles.container}
      setVisible={setVisible}
    >
      <div className={styles.languageOptions}>
        <div
          className={selectableEs ? styles.toggle : styles.nonSelectable}
          onClick={changeLanguageEs}
        >
          <ToggleButton flagType="/images/mxflag.png" desc="Español" />
        </div>
        <div
          className={selectableEn ? styles.toggle : styles.nonSelectable}
          onClick={changeLanguageEn}
        >
          <ToggleButton flagType="/images/usaflag.png" desc="English" />
        </div>
      </div>

      <div className={styles.button}>
        <ButtonTemplate variant="confirm" onClick={() => onClickSave(language)}>
          GUARDAR
        </ButtonTemplate>
      </div>
    </ClosablePopup>
  );
};

export default ModifyLanguage;
