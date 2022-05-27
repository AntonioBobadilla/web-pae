/* eslint-disable jsx-a11y/anchor-is-valid */
import post from '@/helpers/post';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import styles from '../css/components/forgot-password-popup.module.css';
import ButtonTemplate from './button-template';
import Popup from './popup';
import TextInput from './text-input';

interface ForgotPasswordPopupProps {
  setEmailSent: (data: boolean) => void;
  loginUrl: string;
  registerUrl: string;
  user: number;
}

interface ForgotPasswordData {
  email: string;
}

const ForgotPasswordPopup = ({
  setEmailSent,
  loginUrl,
  registerUrl,
  user
}: ForgotPasswordPopupProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordData>({ defaultValues: { email: '' } });

  const { isDirty } = useFormState({ control });

  const handleStatus = (status: number, responseData: any) => {
    try {
      if (status === 200 || status === 201 || status === 204) {
        // toast success

        // set user data

        // dispatch(setLogoutData());

        // redirect to home
        setEmailSent(true);
        setIsLoading(false);
      } else {
        if (responseData.email) {
          const { email } = responseData;
          const input = document.getElementById('email');
          input?.focus();
          toast.error(email);
        }
        toast.error('Something went wrong');
        setIsLoading(false);
      }
    } catch (error) {
      toast.error('Something went wrong');
      setIsLoading(false);
    }
  };

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    post(
      { email: data.email.toLowerCase(), user_type: user },
      'http://server-pae.azurewebsites.net/resetpassword/'
    )
      .then(({ status, responseData }) => {
        handleStatus(status, responseData);
      })
      .catch((err) => {
        handleStatus(500, err);
      });
  });

  return (
    <Popup title="Recuperación de contraseña" line style={styles.modal}>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.input}>
          <span className={styles.text}>Ingresa tu correo institucional</span>
          <TextInput
            name="email"
            placeholder="A0XXXXXXX@tec.mx"
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
        <div className={styles.button}>
          <ButtonTemplate
            variant="primary"
            type="submit"
            disabled={!isDirty || isLoading}
            loading={isLoading}
          >
            RECUPERAR CONTRASEÑA
          </ButtonTemplate>
        </div>
      </form>
      <div className={styles.links}>
        <Link href={loginUrl} passHref>
          <a>Login</a>
        </Link>
        <Link href={registerUrl} passHref>
          <a>Registro</a>
        </Link>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </Popup>
  );
};

export default ForgotPasswordPopup;
