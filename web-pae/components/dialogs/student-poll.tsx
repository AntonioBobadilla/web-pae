import ButtonTemplate from '../button-template';
import ClosablePopup from '../closable-popup';
import pStyles from '../../css/components/dialogs/studentPoll.module.css';
import Poll from '../poll';

type StudentPollProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const StudentPoll = ({ visible, setVisible }: StudentPollProps) => {
  let questions: any[] = [];
  return (
    <ClosablePopup
      title="Encuesta"
      line
      visible={visible}
      style={pStyles.container}
      setVisible={setVisible}
    >
      <div className={pStyles.questions}>
        <div className={pStyles.options}>
          <div className={pStyles.empty}></div>
          <div className={pStyles.text}>
            <p className={pStyles.value}>Totalmente en desacuerdo</p>
            <p className={pStyles.value}>En desacuerdo</p>
            <p className={pStyles.value}>De acuerdo</p>
            <p className={pStyles.value}>Totalmente de acuerdo</p>
          </div>
        </div>
        {questions.map(function (obj) {
          return <Poll key={obj.id} question={obj.poll} name={obj.id}></Poll>;
        })}
        <textarea
          placeholder="Comentarios"
          maxLength={250}
          className={pStyles.comment}
        ></textarea>
        <div className={pStyles.button}>
          <ButtonTemplate variant="confirm">Enviar</ButtonTemplate>
        </div>
      </div>
    </ClosablePopup>
  );
};

export default StudentPoll;
