import { ReactChild, ReactFragment, ReactPortal, useState } from 'react';
import pStyles from '../css/components/poll.module.css';

const Poll = (props: { question: string | null | undefined }) => {
  const [answer, setAnswer] = useState('');

  const handleChange = (e) => {
    setAnswer(e.target.value);
  };

  return (
    <div className={pStyles.main}>
      <p className={pStyles.question}>{props.question}</p>
      <div className={pStyles.form}>
        <input
          type="radio"
          id="1"
          name="answer"
          value="Tagree"
          className={pStyles.rButton}
          onChange={handleChange}
        />
        <input
          type="radio"
          id="2"
          name="answer"
          value="agree"
          className={pStyles.rButton}
          onChange={handleChange}
        />
        <input
          type="radio"
          id="3"
          name="answer"
          value="disagree"
          className={pStyles.rButton}
          onChange={handleChange}
        />
        <input
          type="radio"
          id="4"
          name="answer"
          value="Tdisagree"
          className={pStyles.rButton}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Poll;
