import ClosablePopup from '../closable-popup';
import Styles from '../../css/components/dialogs/subject-added.module.css';
import cx from 'classnames';

type props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const SubjectAdded = ({ visible, setVisible }: props) => (
  <ClosablePopup
    title={undefined}
    line={false}
    visible={visible}
    style={Styles.popUp}
    setVisible={setVisible}
  >
    <div className={Styles.main}>
      <span className={Styles.text}>
        La unidad de formacion fue añadida correctamente
      </span>
      <i className={cx('bi bi-calendar-check', Styles.icon)}></i>
    </div>
  </ClosablePopup>
);

export default SubjectAdded;
