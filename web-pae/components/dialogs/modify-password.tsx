import formStyles from '@/css-components/registerForm.module.css';
import changePassword, { ModifyPasswordData } from '@/helpers/change-password';
import { selectToken } from '@/redux/user';
import React, { useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAppSelector } from 'store/hook';
import styles from '../../css/components/dialogs/modify-password.module.css';
import ButtonTemplate from '../button-template';
import ClosablePopup from '../closable-popup';
import TextInput from '../text-input';

type ModifyPasswordProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const modifyPasswordDefaultValue = {
  currentPassword: '',
  newPassword: '',
  passwordConfirmation: ''
};

const ModifyPassword = ({ visible, setVisible }: ModifyPasswordProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const token = useAppSelector(selectToken);
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

    changePassword(data, token as string)
      .then(({ status, responseData }) => {
        if (status === 200 || status === 201 || status === 204) {
          // toast success
          toast.success(responseData.message);

          // set user data
          setIsLoading(false);
          setTimeout(() => {
            setVisible(false);
          }, 500);
        } else {
          // focus on the first input

          setIsLoading(false);

          if (responseData.password) {
            const button = document.getElementById('currentPassword');
            button?.focus();
            toast.error(responseData.password);
          } else if (responseData.new_password) {
            const button = document.getElementById('newPassword');
            button?.focus();
            toast.error(responseData.new_password);
          } else {
            toast.error(responseData.message);
          }
        }
      })
      .catch(({ message }) => {
        setIsLoading(false);
        toast.error(message);
      });
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
