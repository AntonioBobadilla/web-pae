import React, { useState } from 'react';
import styles from '../../css/components/dialogs/modify-password.module.css';
import registerStyles from '../../css/register.module.css';
import ButtonTemplate from '../button-template';
import ClosablePopup from '../closable-popup';

type ModifyLanguageProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const EditTutorHours = ({ visible, setVisible }: ModifyLanguageProps) => {
  const [input, setInput] = useState(0);
  const handleInput = (e: { target: { value: React.SetStateAction<any> } }) => {
    setInput(e.target.value);
  };
  const onClickSave = () => {
    setVisible(false);
  };
  return (
    <ClosablePopup
      title="Editar horas completadas"
      line
      visible={visible}
      style={styles.container}
      setVisible={setVisible}
    >
      <div className={registerStyles.languageOptions}>
        <input type="text" value={input} onChange={handleInput} /> /80
        <div className={styles.button}>
          <ButtonTemplate variant="confirm">GUARDAR</ButtonTemplate>
        </div>
      </div>
    </ClosablePopup>
  );
};

export default EditTutorHours;
