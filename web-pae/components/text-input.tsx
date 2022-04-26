import TextInputStyles from '../css/components/textInput.module.css';

const TextInput = () => {
  // creo un Stateless Functional Component

  return (
    <div className={TextInputStyles.textInputDiv}>
      <input
        className={TextInputStyles.textInput}
        type="text"
        placeholder="CORREO INSTITUCIONAL*"
      ></input>
    </div>
  );
};

export default TextInput; // exporto la función
