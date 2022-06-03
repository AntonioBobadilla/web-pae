import ButtonTemplate from '../components/button-template';
import React, { ReactElement } from 'react';
import styles from '../css/pae.module.css';

const Landing = () => (
  <div className={styles.page}>
    <div className={styles.header}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src="/images/logo.png" />
      </div>
      <div className={styles.sections}>
        <a href="#qs" className={styles.section}>
          {' '}
          Quiénes somos{' '}
        </a>
        <a href="#cf" className={styles.section}>
          {' '}
          Cómo funciona{' '}
        </a>
        <a href="#ubi" className={styles.section}>
          {' '}
          Ubicación{' '}
        </a>
      </div>
      <div className={styles.buttons}>
        <ButtonTemplate
          className={styles.signup}
          variant="info"
          clickable={true}
        >
          {' '}
          Ingresa{' '}
        </ButtonTemplate>
        <ButtonTemplate
          className={styles.login}
          variant="info"
          clickable={true}
        >
          {' '}
          Regístrate{' '}
        </ButtonTemplate>
      </div>
    </div>

    <div className={styles.imageSection}>
      <img className={styles.mainImage} src="/images/landing.jpeg" />
      <span className={styles.mainText}>
        <br />
        PROGRAMA <br />
        ASESOR <br />
        ESTUDIANTE
        <br />
      </span>
    </div>

    <div className={styles.body}>
      <span id="qs" className={styles.title}>
        ¿Quiénes somos?
      </span>
      <hr className={styles.hr} />
      <span className={styles.description}>
        En el Programa Asesor Estudiante (PAE) recibirás{' '}
        <strong className={styles.bold}> asesorías personalizadas </strong> con
        el apoyo de un alumno quien además de tener un horario similar al tuyo,
        también tiene la mejor intención de ayudarte a{' '}
        <strong className={styles.bold}>resolver todas tus dudas</strong>.
      </span>

      <span id="cf" className={styles.title}>
        ¿Cómo funciona?
      </span>
      <hr className={styles.hr} />
      <span className={styles.description}>
        Tú seleccionas (con 24 horas de anticipación) el{' '}
        <strong className={styles.bold}>horario</strong> en el que te gustaría
        recibir la asesoría, la{' '}
        <strong className={styles.bold}>materia </strong>y los{' '}
        <strong className={styles.bold}>temas o dudas específicas </strong>
        en los que necesites apoyo; posteriormente, recibirás un correo de
        confirmación con información importante sobre la realización de tu
        asesoría.
      </span>

      <span id="ubi" className={styles.title}>
        Ubicación
      </span>
      <hr className={styles.hr} />
      <div className={styles.location}>
        <div className={styles.locationL}>
          <div className={styles.locationT}>
            <span className={styles.locationPAE}>
              <br />
              <strong className={styles.bold}> P</strong>
              ROGRAMA <br />
              <strong className={styles.bold}> A</strong>
              SESOR <br />
              <strong className={styles.bold}> E</strong>
              STUDIANTE
              <br />
            </span>
            <img className={styles.bookImage} src="/images/pae-logo.png" />
          </div>
          <div className={styles.locationB}>
            <span className={styles.descriptionLocation}>
              Encuéntranos en Aulas1 <br />
              <strong className={styles.bold}>A1234</strong>
              <br />
            </span>
            <span className={styles.descriptionLocation}>
              Horario de atención: <br />
              <strong className={styles.bold}>8:00am - 5:00pm</strong>
              <br />
            </span>
            <div className={styles.linkCont}>
              <a className={styles.link} href="https://www.google.com">
                Solicita tu asesoría
              </a>
            </div>
          </div>
        </div>
        <div className={styles.locationR}>
          <img className={styles.imageLocation} src="/images/office.jpg" />
        </div>
      </div>

      <span className={styles.greetings}>
        ¡En PAE estamos encantados de poder ayudarte!{' '}
      </span>
    </div>
  </div>
);

export default Landing;