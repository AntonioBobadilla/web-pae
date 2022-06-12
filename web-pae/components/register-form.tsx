import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from 'store/hook';
import { selectRegisterData } from 'store/reducers/create-tutor';
import styles from '../css/components/registerForm.module.css';
import ButtonTemplate from './button-template';
import Password from './password';
import TextInput from './text-input';

interface RegisterFormProps {
  nextStep: (data: StudentRegisterData) => void;
  student: boolean;
  isLoading: boolean;
}

export type StudentRegisterData = {
  name: string;
  email: string;
  major: string;
  password: string;
  passwordConfirmation: string;
};

export const studentRegisterDefaultValue: StudentRegisterData = {
  email: '',
  password: '',
  major: '',
  name: '',
  passwordConfirmation: ''
};

const RegisterForm = ({ nextStep, student, isLoading }: RegisterFormProps) => {
  const tutorDefaultValues = useAppSelector(selectRegisterData);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<StudentRegisterData>({
    defaultValues: student ? studentRegisterDefaultValue : tutorDefaultValues
  });

  // TODO: DELETE DATA ON NAVIGATE CHANGED
  // const { isDirty } = useFormState({ control });

  const onSubmit = handleSubmit((data) => nextStep(data));

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
          name="major"
          placeholder="CARRERA*"
          control={control}
          error={errors.major}
          style={{ textTransform: 'uppercase' }}
          rules={{
            required: 'Carrera requerida',
            pattern: {
              value: /^[A-Za-z]{2,4}$/,
              message: 'Carrera inválida. E.g. ARQ, LAD, MEC'
            }
          }}
        />
      </div>

      <div className={styles.input}>
        <Password
          name="password"
          control={control}
          error={errors.password}
          rules={{
            required: 'Contraseña requerida',
            minLength: { value: 8, message: 'Contraseña muy corta' }
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
          disabled={isLoading}
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
