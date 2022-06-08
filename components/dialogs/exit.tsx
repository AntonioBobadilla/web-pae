/* eslint-disable react/react-in-jsx-scope */
import Styles from '../../css/components/dialogs/exit.module.css';
import ButtonTemplate from '../button-template';
import ClosablePopup from '../closable-popup';

type ExitProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  handleExit: any;
  handleCancel: any;
  isLoading: boolean;
};

const Exit = ({
  visible,
  setVisible,
  handleExit,
  handleCancel,
  isLoading
}: ExitProps) => (
  <ClosablePopup
    title={undefined}
    line={false}
    visible={visible}
    style={Styles.popUp}
    setVisible={setVisible}
  >
    <div className={Styles.main}>
      <span className={Styles.text}>
        ¿Está seguro/a que quiere cerrar sesión?
      </span>
      <div className={Styles.buttons}>
        <div className={Styles.button1}>
          <ButtonTemplate variant="cancel" onClick={handleCancel}>
            NO, CANCELAR
          </ButtonTemplate>
        </div>
        <div className={Styles.button2}>
          <ButtonTemplate
            variant="confirm"
            disabled={isLoading}
            loading={isLoading}
            onClick={handleExit}
          >
            SI
          </ButtonTemplate>
        </div>
      </div>
    </div>
  </ClosablePopup>
);

export default Exit;
