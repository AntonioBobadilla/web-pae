import ClosablePopup from '../closable-popup';
import Styles from '../../css/components/dialogs/studentQuestion.module.css';

type StudentQuestionProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  tutoringObject: any;
  attatchmentOnClick: any;
};

const StudentQuestion = ({
  visible,
  setVisible,
  tutoringObject,
  attatchmentOnClick
}: StudentQuestionProps) => {
  return (
    <ClosablePopup
      title={'Duda de ' + tutoringObject.firstName}
      line={true}
      visible={visible}
      style={Styles.popUp}
      setVisible={setVisible}
    >
      <div className={Styles.doubtContainer}>
        <span className={Styles.title}>{tutoringObject.doubtTitle}</span>
        <span className={Styles.doubt}>{tutoringObject.doubt}</span>
        <button className={Styles.button} onClick={attatchmentOnClick}>
          Visuzalizar archivo adjunto
        </button>
      </div>
    </ClosablePopup>
  );
};

export default StudentQuestion;
