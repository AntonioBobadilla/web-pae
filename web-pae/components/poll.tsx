import { useState } from 'react';
import pStyles from '../css/components/poll.module.css';

const Poll = (props: {
  question: string | null | undefined;
  name: string | undefined;
}) => {
  const [answer, setAnswer] = useState('1');

  const handleChange = (e: any) => {
    // console.log(e.currentTarget.value);
    setAnswer(e.target.value);
  };

  return (
    <div className={pStyles.main}>
      <p className={pStyles.question}>{props.question}</p>
      <form
        className={pStyles.form}
        id={`pollForm${props.name}`}
        onInput={handleChange}
      >
        <input
          type="radio"
          id={`Tdisagree${props.name}`}
          name={props.name}
          value="1"
          className={pStyles.rButton}
        />
        <input
          type="radio"
          id={`disagree${props.name}`}
          name={props.name}
          value="2"
          className={pStyles.rButton}
        />
        <input
          type="radio"
          id={`agree${props.name}`}
          name={props.name}
          value="3"
          className={pStyles.rButton}
        />
        <input
          type="radio"
          id={`Tagree${props.name}`}
          name={props.name}
          value="4"
          className={pStyles.rButton}
        />
        <input id={`storeValue${props.name}`} type="hidden" value={answer} />
      </form>
    </div>
  );
};

export default Poll;
