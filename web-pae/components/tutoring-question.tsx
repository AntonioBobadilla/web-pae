import qStyles from '../css/components/scheduleTutoringQuestion.module.css';
import ButtonTemplate from './button-template';
import DragAndDrop from './frontend-dragdrop';
import InputTextArea from './input-text-area';

const TutoringQuestion = () => (
  <div className={qStyles.main}>
    <p className={qStyles.qText}>
      Ingresa tus dudas de manera específica a tratar en asesoría*
    </p>
    <div className={qStyles.doubt}>
      <InputTextArea />
    </div>
    <p className={qStyles.qText}>Adjuntar archivo</p>
    <div className={qStyles.dragDrop}>
      <DragAndDrop />
    </div>
    <div className={qStyles.button}>
      <ButtonTemplate variant="primary">Agendar Asesoría</ButtonTemplate>
    </div>
  </div>
);

export default TutoringQuestion;
