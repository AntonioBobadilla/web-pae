import React, { useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import styles from '../css/components/registerForm.module.css';
import ButtonTemplate from './button-template';
import TextInput from './text-input';

interface RegisterFormProps {
  nextStep: (data: StudentRegisterData) => void;
  student: boolean;
}

export type StudentRegisterData = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export const studentRegisterDefaultValue: StudentRegisterData = {
  email: '',
  password: '',
  name: '',
  passwordConfirmation: ''
};

const RegisterForm = ({ nextStep, student }: RegisterFormProps) => {
  const [isValid, setIsValid] = React.useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<StudentRegisterData>({
    defaultValues: studentRegisterDefaultValue
  });

  const { isDirty } = useFormState({ control });

  const onSubmit = handleSubmit((data) => {
    // save data to local storage
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      nextStep(data);
    }, 1000);
  });

  return (
    <form className={styles.registerForm} onSubmit={onSubmit}>
      <div className={styles.input}>
        <TextInput
          name="name"
          placeholder="NOMBRE COMPLETO*"
          control={control}
          error={errors.name}
          rules={{
            required: 'Nombre completo requerido',
            minLength: {
              value: 3,
              message: 'El nombre debe tener al menos 3 caracteres'
            }
          }}
        />
      </div>
      <div className={styles.input}>
        <TextInput
          name="email"
          placeholder="CORREO INSTITUCIONAL*"
          control={control}
          error={errors.email}
          rules={{
            required: 'Correo eléctrónico requerido',
            pattern: {
              value: /^([A,a]{1}[0]{1}[0-9]{7}@tec\.mx)/i,
              message: 'Correo eléctronico inválido. E.g. A0XXXXXXX@tec.mx'
            }
          }}
        />
      </div>
      <div className={styles.input}>
        <TextInput
          name="password"
          type="password"
          placeholder="CONTRASEÑA*"
          control={control}
          error={errors.password}
          rules={{
            required: 'Contraseña requerida',
            minLength: { value: 8, message: 'Contraseña muy corta' },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/i,
              message:
                'Contraseña inválida. Debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial'
            }
          }}
        />
      </div>
      <div className={styles.input}>
        <TextInput
          name="passwordConfirmation"
          type="password"
          placeholder="CONFIRMAR CONTRASEÑA*"
          control={control}
          error={errors.passwordConfirmation}
          rules={{
            required: 'Confirmación de contraseña requerida',
            validate: (value) => value === getValues().password
          }}
        />
      </div>
      <div className={styles.button}>
        <ButtonTemplate
          variant="primary"
          disabled={!isDirty || isLoading}
          loading={isLoading}
          type="submit"
        >
          {student ? 'CONCLUIR REGISTRO' : 'CONTINUAR CON REGISTRO'}
        </ButtonTemplate>
      </div>
    </form>
  );
};

export default RegisterForm;
