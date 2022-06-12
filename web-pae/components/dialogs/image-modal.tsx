import React from 'react';
import styles from '../../css/components/dialogs/modal-image.module.css';
import registerStyles from '../../css/register.module.css';
import ButtonTemplate from '../button-template';
import ClosablePopup from '../closable-popup';

type ModifyLanguageProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  file: any;
};

const imageModal = ({ visible, setVisible, file }: ModifyLanguageProps) => {
  const onClickSave = () => {
    setVisible(false);
  };
  return (
    <ClosablePopup
      title="Archivo adjunto"
      line
      visible={visible}
      style={styles.container}
      setVisible={setVisible}
    >
      <div className={registerStyles.languageOptions}>
        <img src={file} alt="" className={styles.image} />
      </div>
    </ClosablePopup>
  );
};

export default imageModal;
