/* eslint-disable jsx-a11y/label-has-associated-control */
import { NextPage } from 'next';
import React from 'react';
import ButtonTemplate from '../../components/button-template';
import Popup from '../../components/popup';
import TextInput from '../../components/text-input';
import styles from '../../css/student/forgot-password.module.css';

const ForgotPassword: NextPage = () => (
  <div className={styles.container}>
    <div className={styles.background}>
      <Popup title="Recuperación de contraseña" line>
        <form>
          <div>
            <span>Ingresa tu correo institucional</span>
            <TextInput type="text" placeholder="AXXXXXXXX@tec.mx" />
          </div>
          <ButtonTemplate text="RECUPERAR CONTRASEÑA" />
        </form>
      </Popup>
    </div>
  </div>
);

export default ForgotPassword;
