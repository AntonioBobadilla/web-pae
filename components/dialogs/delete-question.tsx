import ClosablePopup from '../closable-popup';
import Styles from '../../css/components/dialogs/delete-question.module.css';

type props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onClickFunction: any;
  onClickCancel: any;
};

const DeleteQuestion = ({
  visible,
  setVisible,
  onClickFunction,
  onClickCancel
}: props) => (
  <ClosablePopup
    title={undefined}
    line={false}
    visible={visible}
    style={Styles.popUp}
    setVisible={setVisible}
  >
    <div className={Styles.main}>
      <span className={Styles.text}>
        ¿Esta seguro que quiere eliminar la pregunta? Una vez eliminada y/o
        modificada el historial de encuestas se perderá
      </span>
      <div className={Styles.buttons}>
        <button onClick={onClickCancel} className={Styles.cancel}>
          Cancelar
        </button>
        <button onClick={onClickFunction} className={Styles.delete}>
          Si,eliminar
        </button>
      </div>
    </div>
  </ClosablePopup>
);

export default DeleteQuestion;
