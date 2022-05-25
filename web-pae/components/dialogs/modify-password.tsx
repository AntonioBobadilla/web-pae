import formStyles from '@/css-components/registerForm.module.css';
import React, { useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import styles from '../../css/components/dialogs/modify-password.module.css';
import ButtonTemplate from '../button-template';
import ClosablePopup from '../closable-popup';
import TextInput from '../text-input';

type ModifyPasswordProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

type ModifyPasswordData = {
  currentPassword: string;
  newPassword: string;
  passwordConfirmation: string;
};

const modifyPasswordDefaultValue = {
  currentPassword: '',
  newPassword: '',
  passwordConfirmation: ''
};

const ModifyPassword = ({ visible, setVisible }: ModifyPasswordProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<ModifyPasswordData>({
    defaultValues: modifyPasswordDefaultValue
  });

  const { isDirty } = useFormState({ control });

  const onSubmit = handleSubmit((data) => {
    // fetch
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  });

  return (
    <ClosablePopup
      title="Modificar contraseña"
      line
      visible={visible}
      style={styles.container}
      setVisible={setVisible}
    >
      <form className={formStyles.registerForm} onSubmit={onSubmit}>
        <div className={formStyles.input}>
          <TextInput
            name="currentPassword"
            type="password"
            placeholder="CONTRASEÑA ACTUAL*"
            control={control}
            error={errors.currentPassword}
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
        <div className={formStyles.input}>
          <TextInput
            name="newPassword"
            type="password"
            placeholder="NUEVA CONTRASEÑA*"
            control={control}
            error={errors.newPassword}
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
        <div className={formStyles.input}>
          <TextInput
            name="passwordConfirmation"
            type="password"
            placeholder="CONFIRMAR CONTRASEÑA*"
            control={control}
            error={errors.passwordConfirmation}
            rules={{
              required: 'Confirmación de contraseña requerida',
              validate: (value) => value === getValues().newPassword
            }}
          />
        </div>
        <div className={formStyles.button}>
          <ButtonTemplate
            variant="confirm"
            disabled={!isDirty || isLoading}
            loading={isLoading}
            type="submit"
          >
            GUARDAR
          </ButtonTemplate>
        </div>
      </form>
    </ClosablePopup>
  );
};

export default ModifyPassword;
