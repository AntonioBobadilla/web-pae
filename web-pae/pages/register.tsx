import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Link from 'next/link';
import ButtonTemplate from '../components/button-template';
import ToggleButton from '../components/toggle-button';
import styles from '../css/register.module.css';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Register: NextPage = () => {
  const router = useRouter();
  const [selectableEn, setSelectableEn] = useState(true);
  const [selectableEs, setSelectableEs] = useState(true);

  const studentHandle = () => {
    router.push('/student/registration');
  };

  const tutorHandle = () => {
    router.push('/tutor/registration');
  };
  const changeLanguageEn = () => {
    setSelectableEn(true);
    setSelectableEs(false);
  };
  const changeLanguageEs = () => {
    setSelectableEs(true);
    setSelectableEn(false);
  };
  const { t } = useTranslation('tutor-profile');
  return (
    <div>
      <Head>
        <title>WEB PAE</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.mainContainer}>
          <div className={styles.leftCont}>
            <img
              src="/images/register-image.jpg"
              className={styles.registerImage}
            />
          </div>
          <div className={styles.register}>
            <div className={styles.paeRegister}>
              <img src="/images/pae-logo.png" className={styles.paeLogo} />
              <h1 className={styles.paeText}> PAE | {t('REGISTRO')} </h1>
            </div>
            <div className={styles.registerOptions}>
              <div className={styles.Button}>
                <ButtonTemplate
                  onClick={studentHandle}
                  variant="primary"
                  className={styles.fontS}
                >
                  { t('QUIERO UNA ASESORÍA')}
                </ButtonTemplate>
              </div>
              <div className={styles.Button}>
                <ButtonTemplate
                  onClick={tutorHandle}
                  variant="secondary"
                  className={styles.fontS}
                >
                  {t('QUIERO DAR UNA ASESORÍA')}
                </ButtonTemplate>
              </div>
              <h2 className={styles.language}>Idioma / Language</h2>
              <div className={styles.languageOptions}>
                <div
                  className={
                    selectableEs ? styles.toggle : styles.nonSelectable
                  }
                  onClick={changeLanguageEs}
                >
                  <Link href='/register' locale={"es"}>
                    <a>
                      <ToggleButton flagType="/images/mxflag.png" desc={t('Español')} />
                    </a>
                  </Link>
                </div>
                <div
                  className={
                    selectableEn ? styles.toggle : styles.nonSelectable
                  }
                  onClick={changeLanguageEn}
                >
                <Link href='/register' locale={"en"}>
                  <a>
                    <ToggleButton flagType="/images/usaflag.png" desc={t('Ingles')} />
                  </a>
                </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export async function getStaticProps({ locale }: { locale: any }) {

  //traductor pagina principal
  return {
    props: {
      ...(await serverSideTranslations(locale, [ 'tutor-profile']))
    }
  };
}

export default Register;
