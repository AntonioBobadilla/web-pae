import ButtonTemplate from '@/components/button-template';
import Password from '@/components/password';
import Popup from '@/components/popup';
import TextInput from '@/components/text-input';
import formStyles from '@/css-components/registerForm.module.css';
import styles from '@/css-components/resetPassword.module.css';
import post from '@/helpers/post';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

type ChangePasswordData = {
  newPassword: string;
  passwordConfirmation: string;
};

const changePasswordDefaultValue: ChangePasswordData = {
  newPassword: '',
  passwordConfirmation: ''
};

const ChangePassword: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { query, push } = useRouter();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<ChangePasswordData>({
    defaultValues: changePasswordDefaultValue
  });

  const { isDirty } = useFormState({ control });

  const handleStatus = (status: number, responseData: any) => {
    try {
      if (status === 200 || status === 201 || status === 204) {
        // toast success
        toast.success(responseData.message);
        // redirect to home
        setTimeout(() => push('/'), 1000);
      } else {
        // toast error
        toast.error(responseData.message);

        // set error state
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      toast.error('Something went wrong');
    }
  };

  const onSubmit = handleSubmit((data) => {
    // fetch
    setIsLoading(true);
    const { uid, token } = query;

    // fetch()

    post(
      {
        ui64: uid,
        token,
        new_password: data.newPassword
      },
      'https://server-pae.azurewebsites.net/changepasswordtoken/'
    )
      .then(({ status, responseData }) => {
        handleStatus(status, responseData);
      })
      .catch((err) => {
        handleStatus(500, err);
      });
  });

  return (
    <Popup title="Renovación de contraseña" line style={styles.modal}>
      <form className={formStyles.registerForm} onSubmit={onSubmit}>
        <div className={formStyles.input}>
          <Password
            name="newPassword"
            placeholder="NUEVA CONTRASEÑA*"
            control={control}
            error={errors.newPassword}
            rules={{
              required: 'Contraseña requerida',
              minLength: { value: 8, message: 'Contraseña muy corta' }
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
            variant="primary"
            type="submit"
            disabled={!isDirty || isLoading}
            loading={isLoading}
          >
            ACTUALIZAR CONTRASEÑA
          </ButtonTemplate>
        </div>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </Popup>
  );
};

export default ChangePassword;
