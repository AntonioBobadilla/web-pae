import ClosablePopup from '../closable-popup';
import Styles from '../../css/components/dialogs/delete-question.module.css';
import { useTranslation } from 'next-i18next';

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
}: props) => {
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
        <span className={Styles.text}>{t('Are your sure')}</span>
        <div className={Styles.buttons}>
          <button onClick={onClickCancel} className={Styles.cancel}>
            {t('Cancel')}
          </button>
          <button onClick={onClickFunction} className={Styles.delete}>
            {t('Yes, delete')}
          </button>
        </div>
      </div>
    </ClosablePopup>
  );
};

export default DeleteQuestion;
