import TextInputStyles from '../css/components/textInput.module.css';

const TextInput = (props: {
  type: string | (string & {}) | undefined;
  placeholder: string | undefined;
}) => {
  // creo un Stateless Functional Component

  return (
    <input
      className={TextInputStyles.textInput}
      type={props.type}
      placeholder={props.placeholder}
    ></input>
  );
};

export default TextInput; // exporto la función
