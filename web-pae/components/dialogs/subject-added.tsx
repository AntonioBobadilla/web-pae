import ClosablePopup from '../closable-popup';
import Styles from '../../css/components/dialogs/subject-added.module.css';

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
    </div>
  </ClosablePopup>
);

export default SubjectAdded;
