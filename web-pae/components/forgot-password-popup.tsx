/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import styles from '../css/components/forgot-password-popup.module.css';
import ButtonTemplate from './button-template';
import Popup from './popup';
import TextInput from './text-input';
import { useTranslation } from 'next-i18next';

interface ForgotPasswordPopupProps {
  setEmailSent: (data: boolean) => void;
}

interface ForgotPasswordData {
  email: string;
}

const ForgotPasswordPopup = ({ setEmailSent }: ForgotPasswordPopupProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation('common');

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordData>({ defaultValues: { email: '' } });

  const { isDirty } = useFormState({ control });

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
    }, 2000);
  });

  return (
    <Popup title={t('Password recovery')} line>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.input}>
          <span className={styles.text}>
            {t('Enter your institutional email')}
          </span>
          <TextInput
            name="email"
            placeholder="CORREO INSTITUCIONAL"
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
        <Link href="/student/login" passHref>
          <a>Login</a>
        </Link>
        <Link href="/student/register" passHref>
          <a>Registro</a>
        </Link>
      </div>
    </Popup>
  );
};

export default ForgotPasswordPopup;
