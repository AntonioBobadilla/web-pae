import ClosablePopup from '../closable-popup';
import Styles from '../../css/components/dialogs/subject-added.module.css';

type props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const AdminAdded = ({ visible, setVisible }: props) => (
  <ClosablePopup
    title={undefined}
    line={false}
    visible={visible}
    style={Styles.popUp}
    setVisible={setVisible}
  >
    <div className={Styles.main}>
      <span className={Styles.text}>
        El/La adminitrador fue añadido correctamente
      </span>
    </div>
  </ClosablePopup>
);

export default AdminAdded;
