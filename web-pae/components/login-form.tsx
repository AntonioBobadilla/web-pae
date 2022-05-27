/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/function-component-definition */
import useRole from '@/hooks/useRole';
import useToken from '@/hooks/useToken';
import { setLoginData } from '@/redux/user';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useAppDispatch } from 'store/hook';
import styles from '../css/student/studentLogin.module.css';
import login from '../helpers/login';
import ButtonTemplate from './button-template';
import { LoginData, loginDefaultValues } from './login-input';
import TextInput from './text-input';

interface LoginFormProps {
  image: string;
  homeRoute: string;
  user: string;
  forgotPasswordRoute: string;
}

const LoginForm = ({
  image,
  homeRoute,
  user,
  forgotPasswordRoute
}: LoginFormProps) => {
  const { token, setToken } = useToken();
  const { role, setRole } = useRole();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<LoginData>({ defaultValues: loginDefaultValues });

  const dispatch = useAppDispatch();
  const { isDirty } = useFormState({ control });

  const handleStatus = (status: number, responseData: any) => {
    try {
      if (status === 200 || status === 201 || status === 204) {
        // toast success
        toast.success(responseData.message);

        // set user data
        dispatch(
          setLoginData({
            token: responseData.token,
            name: responseData.user, // name: responseData.name,
            email: getValues('email'),
            role: user
          })
        );

        // set token
        setToken(responseData.token);
        setRole(user);

        // redirect to home
        setTimeout(() => router.push(homeRoute), 500);
      } else {
        // focus on the first input

        const button = document.getElementById('email');
        button?.focus();

        // toast error
        toast.error(responseData.message);

        // set error state
        setIsLoading(false);
      }
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  const onSubmit = handleSubmit((data) => {
    // Update state
    setIsLoading(true);

    // Call login function
    const formattedUser = `${user}${data.email.substring(0, 9)}`.toLowerCase();

    login(formattedUser, data.password)
      .then(({ status, responseData }) => {
        handleStatus(status, responseData);
      })
      .catch((err) => {
        handleStatus(500, err);
      });
  });

  return (
    <div>
      <Head>
        <title>Inicia sesión</title>
        <meta name="description" content="Generated by Hacket" />
        <link rel="icon" href="/images/icon.ico" />
      </Head>
      <Toaster position="top-right" reverseOrder={false} />

      <main>
        <form className={styles.mainContainer} onSubmit={onSubmit}>
          <div className={styles.leftCont}>
            <img src={image} className={styles.loginImage} />
          </div>
          <div className={styles.signIn}>
            <div className={styles.paeLogin}>
              <Image
                src="/images/logo.png"
                alt="logo"
                priority
                layout="fixed"
                width={100}
                height={33}
              />
              <h1 className={styles.paeText}> | INICIO</h1>
              <h1 className={styles.title}>Inicio de sesión</h1>
            </div>
            <div className={styles.loginFields}>
              <div className={styles.component}>
                <TextInput
                  name="email"
                  placeholder="CORREO INSTITUCIONAL"
                  control={control}
                  error={errors.email}
                  rules={{
                    required: 'Matrícula requerida',
                    pattern: {
                      value: /^([A,a]{1}[0]{1}[0-9]{7}(@tec\.mx)*)/i,
                      message:
                        'Correo eléctronico inválido. E.g. A0XXXXXXX@tec.mx'
                    }
                  }}
                />
              </div>
              <div className={styles.component}>
                <TextInput
                  name="password"
                  type="password"
                  placeholder="CONTRASEÑA"
                  control={control}
                  error={errors.password}
                  rules={{
                    required: 'Contraseña requerida',
                    minLength: { value: 8, message: 'Contraseña muy corta' }
                  }}
                />
              </div>
              <div className={styles.componentB}>
                <ButtonTemplate
                  variant="primary"
                  type="submit"
                  disabled={!isDirty || isLoading}
                  loading={isLoading}
                >
                  INICIAR SESION
                </ButtonTemplate>
              </div>
            </div>
            <div className={styles.notUser}>
              <Link href={forgotPasswordRoute}>
                <a className={styles.forgotPassword}>Olvidé mi contraseña</a>
              </Link>
              <h2 className={styles.register}>
                ¿No tienes cuenta?{' '}
                <Link href="/register">
                  <a className={styles.regLink}>Regístrate</a>
                </Link>
              </h2>
              <a href="#" className={styles.privacy}>
                Aviso de privacidad
              </a>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default LoginForm;
