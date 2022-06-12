import ClosablePopup from '../closable-popup';
import Styles from '../../css/components/dialogs/delete-question.module.css';

type props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onClickCancel: any;
};

const ModifyQuestion = ({ visible, setVisible, onClickCancel }: props) => (
  <ClosablePopup
    title={undefined}
    line={false}
    visible={visible}
    style={Styles.popUp}
    setVisible={setVisible}
  >
    <div className={Styles.main}>
      <span className={Styles.text}>
        ¿Esta seguro que quiere modificar la pregunta? Una vez modificada todas
        las encuestas donde se usó tendran las respuestas anteriores con la
        nueva pregunta
      </span>
      <div className={Styles.buttons}>
        <button onClick={onClickCancel} className={Styles.delete}>
          Entendido
        </button>
      </div>
    </div>
  </ClosablePopup>
);

export default ModifyQuestion;
