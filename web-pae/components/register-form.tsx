import React from 'react';
import styles from '../css/components/registerForm.module.css';
import registerSteps from '../helpers/steps';
import ButtonTemplate from './button-template';
import TextInput from './text-input';

interface RegisterFormProps {
  setStep: (step: any) => void;
}

const RegisterForm = ({ setStep }: RegisterFormProps) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [passwordConfirmationError, setPasswordConfirmationError] =
    React.useState('');
  const [isValid, setIsValid] = React.useState(false);

  const handleName = (e: { target: { value: string } }) => {
    setName(e.target.value);
    if (e.target.value.length > 0) {
      setNameError('');
    }
  };

  const handleEmail = (e: { target: { value: string } }) => {
    setEmail(e.target.value);
    if (e.target.value.length > 0) {
      setEmailError('');
    }
  };

  const handlePassword = (e: { target: { value: string } }) => {
    setPassword(e.target.value);
    if (e.target.value.length > 0) {
      setPasswordError('');
    }
  };

  const handlePasswordConfirmation = (e: { target: { value: string } }) => {
    setPasswordConfirmation(e.target.value);
    if (e.target.value.length > 0) {
      setPasswordConfirmationError('');
    }
  };

  const handleSubmit = () => {
    if (name.length === 0) {
      setNameError('El nombre es requerido');
    }
    if (email.length === 0) {
      setEmailError('El email es requerido');
    }
    if (password.length === 0) {
      setPasswordError('La contraseña es requerida');
    }
    if (passwordConfirmation.length === 0) {
      setPasswordConfirmationError(
        'La confirmación de contraseña es requerida'
      );
    }
    if (
      name.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      passwordConfirmation.length > 0
    ) {
      setIsValid(true);
      setStep(registerSteps.SCHEDULE);
    }
  };

  return (
    <div className={styles.registerForm}>
      <div className={styles.input}>
        <TextInput
          type="input"
          placeholder="NOMBRE COMPLETO*"
          handleChange={(e) => handleName(e)}
        />
        {nameError.length > 0 && <p className="error">{nameError}</p>}
      </div>
      <div className={styles.input}>
        <TextInput
          type="input"
          placeholder="CORREO INSTITUCIONAL*"
          handleChange={(e) => handleEmail(e)}
        />
        {emailError.length > 0 && <p className="error">{emailError}</p>}
      </div>
      <div className={styles.input}>
        <TextInput
          type="input"
          placeholder="CONTRASEÑA*"
          handleChange={(e) => handlePassword(e)}
        />
        {passwordError.length > 0 && <p className="error">{passwordError}</p>}
      </div>
      <div className={styles.input}>
        <TextInput
          type="input"
          placeholder="CONFIRMAR CONTRASEÑA*"
          handleChange={(e) => handlePasswordConfirmation(e)}
        />
        {passwordConfirmationError.length > 0 && (
          <p className="error">{passwordConfirmationError}</p>
        )}
      </div>
      <div className={styles.button}>
        <ButtonTemplate
          text="REGISTRARSE"
          onClickFunction={() => handleSubmit()}
          color="039BE5"
        />
      </div>
    </div>
  );
};

export default RegisterForm;
