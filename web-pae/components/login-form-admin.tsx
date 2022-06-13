/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/function-component-definition */
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useAppDispatch } from 'store/hook';
import { setLoginData } from 'store/reducers/user';
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

const LoginFormAdmin = ({
  image,
  homeRoute,
  user,
  forgotPasswordRoute
}: LoginFormProps) => {
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

        dispatch(
          setLoginData({
            id: `${getValues('email').split('@')[0]}`,
            token: responseData.token,
            name: responseData.user, // name: responseData.name,
            email: getValues('email'),
            role: 'admin'
          })
        );

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
      setIsLoading(false);
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
              <img src="/images/pae-logo.png" className={styles.paeLogo} />
              <h1 className={styles.paeText}> PAE | LOGIN</h1>
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
                      value: /^([A,a,L,l]{1}[0-9]{8}(@tec\.mx)*)/i,
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
              <Link href="/" passHref>
                <a className={styles.privacy}>Aviso de privacidad</a>
              </Link>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default LoginFormAdmin;
