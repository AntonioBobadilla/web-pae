import { ChangeEventHandler } from 'react';
import TextInputStyles from '../css/components/textInput.module.css';

const TextInput = (props: {
  type: string | (string & {}) | undefined;
  placeholder: string | undefined;
  handleChange: ChangeEventHandler<HTMLInputElement> | undefined;
}) => {
  // creo un Stateless Functional Component

  return (
    <input
      className={TextInputStyles.textInput}
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.handleChange}
    ></input>
  );
};

export default TextInput; // exporto la función
