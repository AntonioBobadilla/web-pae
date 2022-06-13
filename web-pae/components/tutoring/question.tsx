import qStyles from '@/css-components/scheduleTutoringQuestion.module.css';
import { useAppSelector } from 'store/hook';
import {
  selectContent,
  selectFile,
  selectIsLoading,
  selectTitle
} from 'store/reducers/schedule-tutoring';
import ButtonTemplate from '../button-template';
import DragAndDrop from '../drag-and-drop';
import InputTextArea from '../input-text-area';
import { useTranslation } from 'next-i18next';  // add this

const TutoringQuestion = ({
  handleNextStep
}: {
  handleNextStep: () => void;
}) => {
  const title = useAppSelector(selectTitle);
  const content = useAppSelector(selectContent);
  const file = useAppSelector(selectFile);
  const isLoading = useAppSelector(selectIsLoading);

  const schedule = () => {
    handleNextStep();
  };

  const { t } = useTranslation('student-schedule-tutoring'); // add this


  return (
    <div className={qStyles.main}>
      <p className={qStyles.qText}>
       {t('Ingresa tus dudas de manera específica a tratar en asesoría*')}
      </p>
      <div className={qStyles.doubt}>
        <InputTextArea title={title} content={content} />
      </div>
      <p className={qStyles.qText}>{t('Adjuntar archivo')}</p>
      <div className={qStyles.dragDrop}>
        <DragAndDrop file={file} />
      </div>
      <div className={qStyles.button}>
        <ButtonTemplate
          variant="primary"
          onClick={schedule}
          loading={isLoading}
          disabled={isLoading}
        >
          {t('Agendar Asesoría')}
        </ButtonTemplate>
      </div>
    </div>
  );
};

export default TutoringQuestion;
