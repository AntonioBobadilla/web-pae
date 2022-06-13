import ClosablePopup from '../closable-popup';
import Styles from '../../css/components/dialogs/delete-question.module.css';
import { useTranslation } from 'next-i18next';

type props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onClickCancel: any;
};

const ModifyQuestion = ({ visible, setVisible, onClickCancel }: props) => {
  const { t } = useTranslation('admin-polls');
  return (
    <ClosablePopup
      title={undefined}
      line={false}
      visible={visible}
      style={Styles.popUp}
      setVisible={setVisible}
    >
      <div className={Styles.main}>
        <span className={Styles.text}>{t('Are you sure modify')}</span>
        <div className={Styles.buttons}>
          <button onClick={onClickCancel} className={Styles.delete}>
            {t('Understood')}
          </button>
        </div>
      </div>
    </ClosablePopup>
  );
};

export default ModifyQuestion;
