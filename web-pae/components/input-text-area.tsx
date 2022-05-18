import React from 'react';
import itaStyles from '../css/components/inputTextArea.module.css';

const InputTextArea = () => {
  const [current1, setCurrent1] = React.useState(0);
  const [current2, setCurrent2] = React.useState(0);

  return (
    <div className={itaStyles.main}>
      <div className={itaStyles.top}>
        <textarea
          name="title"
          id="title"
          maxLength={50}
          placeholder="Tema a tratar*"
          className={itaStyles.title}
          onChange={(e) => {
            setCurrent1(e.currentTarget.textLength);
          }}
        ></textarea>
        <div className={itaStyles.count1}>
          <span id="current">{current1}</span>
          <span id="maximum">/ 50</span>
        </div>
      </div>
      <div className={itaStyles.bottom}>
        <textarea
          name="content"
          id="content"
          maxLength={200}
          placeholder="Duda especifica a tratar en asesoria"
          className={itaStyles.content}
          onChange={(e) => {
            setCurrent2(e.currentTarget.textLength);
          }}
        ></textarea>
        <div className={itaStyles.count2}>
          <span id="current">{current2}</span>
          <span id="maximum">/ 200</span>
        </div>
      </div>
    </div>
  );
};

export default InputTextArea;
