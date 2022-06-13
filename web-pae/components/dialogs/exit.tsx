/* eslint-disable react/react-in-jsx-scope */
import Styles from '../../css/components/dialogs/exit.module.css';
import ButtonTemplate from '../button-template';
import ClosablePopup from '../closable-popup';
import { useTranslation } from 'next-i18next';

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
}: ExitProps) => {
  const { t } = useTranslation('tutor-profile');
  return ( 
  <ClosablePopup
    title={undefined}
    line={false}
    visible={visible}
    style={Styles.popUp}
    setVisible={setVisible}
  >
    <div className={Styles.main}>
      <span className={Styles.text}>
        {t('¿Está seguro/a que quiere cerrar sesión?')}
      </span>
      <div className={Styles.buttons}>
        <div className={Styles.button1}>
          <ButtonTemplate variant="cancel" onClick={handleCancel}>
            {t('NO, CANCELAR') }
          </ButtonTemplate>
        </div>
        <div className={Styles.button2}>
          <ButtonTemplate
            variant="confirm"
            disabled={isLoading}
            loading={isLoading}
            onClick={handleExit}
          >
            {t('SI')}
          </ButtonTemplate>
        </div>
      </div>
    </div>
  </ClosablePopup>
)};

export default Exit;
