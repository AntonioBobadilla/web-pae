import { useEffect, useState } from 'react';
import styles from '../../css/components/dialogs/modal-image.module.css';
import registerStyles from '../../css/register.module.css';
import ClosablePopup from '../closable-popup';

type ModifyLanguageProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  file: any;
};

const imageModal = ({ visible, setVisible, file }: ModifyLanguageProps) => {
  const [newFile, setNewFile] = useState(file);

  const onClickSave = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (file !== null) {
      let str = file.split('://');
      setNewFile('https://' + str[1]);
    }
  }, []);
  return (
    <ClosablePopup
      title="Archivo adjunto"
      line
      visible={visible}
      style={styles.container}
      setVisible={setVisible}
    >
      <div className={registerStyles.languageOptions}>
        <img src={newFile} alt="" className={styles.image} />
      </div>
    </ClosablePopup>
  );
};

export default imageModal;
