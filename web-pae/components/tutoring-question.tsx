import qStyles from '../css/components/scheduleTutoringQuestion.module.css';
import ButtonTemplate from './button-template';
import DragAndDrop from './frontend-dragdrop';
import StepsStudent from './frontend-stepsStudent';
import InputTextArea from './input-text-area';

const TutoringQuestion = () => {
  return (
    <div className={qStyles.main}>
      <div className={qStyles.steps}>
        <StepsStudent></StepsStudent>
      </div>
      <p className={qStyles.qText}>
        Ingresa tus dudas de manera específica a tratar en asesoría*
      </p>
      <div className={qStyles.doubt}>
        <InputTextArea></InputTextArea>
      </div>
      <p className={qStyles.qText}>Adjuntar archivo</p>
      <div className={qStyles.dragDrop}>
        <DragAndDrop></DragAndDrop>
      </div>
      <div className={qStyles.button}>
        <ButtonTemplate variant="primary">Agendar Asesoría</ButtonTemplate>
      </div>
    </div>
  );
};

export default TutoringQuestion;
