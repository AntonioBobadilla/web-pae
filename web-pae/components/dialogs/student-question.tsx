import ClosablePopup from '../closable-popup';
import Styles from '../../css/components/dialogs/studentQuestion.module.css';
import ImageModal from '../dialogs/image-modal';
import { useState } from 'react';

type StudentQuestionProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  tutoringObject: any;
};

const StudentQuestion = ({
  visible,
  setVisible,
  tutoringObject
}: StudentQuestionProps) => {
  const [imageModalVisible, setImageModalVisible] = useState(false);

  const onClickImageModalVisible = () => {
    setImageModalVisible(true);
  };

  let { student } = tutoringObject;
  console.log(student.name);
  return (
    <ClosablePopup
      title={'Duda de ' + student.name}
      line={true}
      visible={visible}
      style={Styles.popUp}
      setVisible={setVisible}
    >
      <div className={Styles.doubtContainer}>
        <span className={Styles.title}>{tutoringObject.topic}</span>
        <span className={Styles.doubt}>{tutoringObject.doubt}</span>
        <button className={Styles.button} onClick={onClickImageModalVisible}>
          Visualizar archivo adjunto
        </button>
      </div>
      {imageModalVisible && (
        <ImageModal
          visible={imageModalVisible}
          setVisible={setImageModalVisible}
          file={tutoringObject.file}
        />
      )}
    </ClosablePopup>
  );
};

export default StudentQuestion;
