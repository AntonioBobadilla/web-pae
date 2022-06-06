import qStyles from '@/css-components/scheduleTutoringQuestion.module.css';
import { useAppSelector } from 'store/hook';
import {
  selectContent,
  selectFile,
  selectTitle
} from 'store/reducers/schedule-tutoring';
import ButtonTemplate from '../button-template';
import DragAndDrop from '../drag-and-drop';
import InputTextArea from '../input-text-area';

const TutoringQuestion = ({
  handleNextStep
}: {
  handleNextStep: () => void;
}) => {
  const title = useAppSelector(selectTitle);
  const content = useAppSelector(selectContent);
  const file = useAppSelector(selectFile);

  const schedule = () => {
    handleNextStep();
  };

  return (
    <div className={qStyles.main}>
      <p className={qStyles.qText}>
        Ingresa tus dudas de manera específica a tratar en asesoría*
      </p>
      <div className={qStyles.doubt}>
        <InputTextArea title={title} content={content} />
      </div>
      <p className={qStyles.qText}>Adjuntar archivo</p>
      <div className={qStyles.dragDrop}>
        <DragAndDrop file={file} />
      </div>
      <div className={qStyles.button}>
        <ButtonTemplate variant="primary" onClick={schedule}>
          Agendar Asesoría
        </ButtonTemplate>
      </div>
    </div>
  );
};

export default TutoringQuestion;
