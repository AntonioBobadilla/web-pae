import type { NextPage } from 'next';
import React, { ReactElement, useState } from 'react';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import tutorintstyles from '@/css-components/tutoring-requests.module.css';
import styles from '@/css-admin/tutees.module.css';
import cx from 'classnames';

const Tutorings: NextPage = () => {

  const [currentTab, setCurrentTab] = useState('');

  return (
    <div className={tutorintstyles.main}>
      <button className={tutorintstyles.Mainbutton}>Asesorías solicitadas</button>
      <table
          className={styles.tableRequest}
        >
        <thead>
          <tr className={cx(styles.headRow, styles.tr)}>
            <th className={styles.head}>Alumno solicitante</th>
            <th className={styles.head}>Asesor sugerido</th>
            <th className={styles.head}>UF solicitada</th>
            <th className={styles.head}>Horario</th>
            <th className={styles.head}>Modalidad</th>
            <th className={styles.head}></th>
          </tr>
        </thead>
        <tbody>
                <tr  className={styles.tr}>
                  <td className={styles.td}>
                    <p className={tutorintstyles.name}>José Antonio</p>
                    <p className={tutorintstyles.apellidos}>Bobadilla García</p>
                    <div className={tutorintstyles.data}>
                      <p className={tutorintstyles.major}>ITC</p>
                      <p className={tutorintstyles.matricula}>A01734433</p>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <p className={tutorintstyles.name}>José Antonio</p>
                    <p className={tutorintstyles.apellidos}>Bobadilla García</p>
                    <div className={tutorintstyles.data}>
                      <p className={tutorintstyles.major}>ITC</p>
                      <p className={tutorintstyles.matricula}>A01734433</p>
                      <i className= {cx( tutorintstyles.button,"bi bi-pencil")}></i>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <p className={tutorintstyles.subject}>TC2005B</p>
                    <p className={tutorintstyles.subjectfull}>Programación orientada a objetos</p>
                  </td>
                  <td className={styles.td}>
                    <p className={tutorintstyles.fullday}>18 de Marzo</p>
                    <p className={tutorintstyles.hora}>12:00 PM</p>
                  </td>
                  <td className={styles.td}>
                      <p className={tutorintstyles.item}>En línea</p>
                      <i className= {cx( tutorintstyles.button,"bi bi-pencil")}></i>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.flex}>
                      <button onClick={() => acceptTutee(item.registration_number)} className={styles.accept}>Aceptar asesoría</button>
                      <button onClick={() => deleteTutee(item.registration_number)} className={styles.denied}>Rechazar asesoría</button>
                    </div>
                  </td>
                </tr>
                <tr  className={styles.tr}>
                  <td className={styles.td}>
                    <p className={tutorintstyles.name}>José Antonio</p>
                    <p className={tutorintstyles.apellidos}>Bobadilla García</p>
                    <div className={tutorintstyles.data}>
                      <p className={tutorintstyles.major}>ITC</p>
                      <p className={tutorintstyles.matricula}>A01734433</p>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <p className={tutorintstyles.name}>José Antonio</p>
                    <p className={tutorintstyles.apellidos}>Bobadilla García</p>
                    <div className={tutorintstyles.data}>
                      <p className={tutorintstyles.major}>ITC</p>
                      <p className={tutorintstyles.matricula}>A01734433</p>
                      <i className= {cx( tutorintstyles.button,"bi bi-pencil")}></i>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <p className={tutorintstyles.subject}>TC2005B</p>
                    <p className={tutorintstyles.subjectfull}>Programación orientada a objetos</p>
                  </td>
                  <td className={styles.td}>
                    <p className={tutorintstyles.fullday}>18 de Marzo</p>
                    <p className={tutorintstyles.hora}>12:00 PM</p>
                  </td>
                  <td className={styles.td}>
                      <p className={tutorintstyles.item}>En línea</p>
                      <i className= {cx( tutorintstyles.button,"bi bi-pencil")}></i>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.flex}>
                      <button onClick={() => acceptTutee(item.registration_number)} className={styles.accept}>Aceptar asesoría</button>
                      <button onClick={() => deleteTutee(item.registration_number)} className={styles.denied}>Rechazar asesoría</button>
                    </div>
                  </td>
                </tr>
        </tbody>
        </table>
    </div>
  )
};

// Add sidebar layout
Tutorings.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Solicitudes de asesorías">{page}</SidebarLayout>;
};

export default Tutorings;
