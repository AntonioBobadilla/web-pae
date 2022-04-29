import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import ButtonTemplate from '../components/button-template';
import TextInput from '../components/text-input';
import Link from 'next/link';
import styles from '../css/register.module.css';
import ToggleButton from '../components/toggle-button';

const Register: NextPage = () => {
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
              <h1 className={styles.paeText}> PAE | REGISTRO</h1>
            </div>
            <div className={styles.registerOptions}>
              <div className={styles.Button}>
                <ButtonTemplate
                  text="QUIERO UNA ASESORÍA"
                  onClickFunction={undefined}
                  color={undefined}
                />
              </div>
              <div className={styles.Button}>
                <ButtonTemplate
                  text="QUIERO DAR UNA ASESORÍA"
                  onClickFunction={undefined}
                  color={'#C4C4C4'}
                />
              </div>
              <h2 className={styles.language}>Idioma / Language</h2>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
