import { useTranslation } from 'next-i18next'; // add this
import React from 'react';
import { useAppDispatch } from 'store/hook';
import { setContent, setTitle } from 'store/reducers/schedule-tutoring';
import itaStyles from '../css/components/inputTextArea.module.css';


type InputTextAreaProps = {
  title: string;
  content: string;
};

const InputTextArea = ({ title, content }: InputTextAreaProps) => {
  const { t } = useTranslation('student-schedule-tutoring'); // add this

  const [current1, setCurrent1] = React.useState(0);
  const [current2, setCurrent2] = React.useState(0);

  const dispatch = useAppDispatch();

  const handleChange1 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setTitle(e.currentTarget.value));
    setCurrent1(e.target.value.length);
  };

  const handleChange2 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setContent(e.currentTarget.value));
    setCurrent2(e.target.value.length);
  };

  return (
    <div className={itaStyles.main}>
      <div className={itaStyles.top}>
        <textarea
          name="title"
          id="title"
          maxLength={50}
          placeholder={t('Tema a tratar*')}
          value={title}
          className={itaStyles.title}
          onChange={handleChange1}
        />
        <div className={itaStyles.count1}>
          <span id="current">{current1}</span>
          <span id="maximum">/ 50</span>
        </div>
      </div>
      <div className={itaStyles.bottom}>
        <textarea
          name="content"
          id="content"
          value={content}
          maxLength={200}
          placeholder={t('Duda especifica a tratar en asesoria')}

          className={itaStyles.content}
          onChange={handleChange2}
        />
        <div className={itaStyles.count2}>
          <span id="current">{current2}</span>
          <span id="maximum">/ 200</span>
        </div>
      </div>
    </div>
  );
};

export default InputTextArea;
