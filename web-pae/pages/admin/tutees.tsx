import type { NextPage } from 'next';
import React, { ReactElement } from 'react';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import styles from '@/css-admin/tutees.module.css'
import cx from 'classnames';

const Tutorings: NextPage = () => {

    let data = [
        {
            matricula: 'A01734433',
            nombre: 'Antonio Bobadilla',
            carrera: 'ITC',
            materias: 'TC2005B',
            horas: 23,
            horarios: ''
        },
        {
            matricula: 'A01732533',
            nombre: 'Salvador Gaytán',
            carrera: 'IMT',
            materias: 'QF1993',
            horas: 3,
            horarios: ''
        },
        {
            matricula: 'A03741743',
            nombre: 'Alex Reus',
            carrera: 'IBT',
            materias: 'TC2005B',
            horas: 23,
            horarios: ''
        }
    ]
    return (
    <div className={styles.main}>
        <table className={styles.table}>
            <tr className={cx(styles.headRow, styles.tr)}>
                <th className={styles.head}>Matricula</th>
                <th className={styles.head}>Nombre</th>
                <th className={styles.head}>Carrera</th>
                <th className={styles.head}>Materias de asesoría</th>
                <th className={styles.head}>Número de horas</th>
                <th className={styles.head}>Horarios</th>
                <th className={styles.head}></th>
            </tr>
            {
                data.map(function(item) {
                    return (
                         <tr className={styles.tr}>
                            <td className={styles.td}>
                                <p>{item.matricula}</p>
                            </td>
                            <td className={styles.td}>
                                <p>{item.nombre}</p>
                            </td>
                            <td className={styles.td}>
                                <p>{item.carrera}</p>
                            </td>
                            <td className={styles.td}>
                                <p>{item.materias}</p>
                            </td>
                            <td className={styles.td}>
                                <p>{item.horas}/80</p>
                            </td>
                            <td className={styles.td}>
                                <button className={styles.button}>Ver</button>
                            </td>
                            <td className={styles.td}>
                                <i className="bi bi-pencil"></i>
                            </td>                             
                        </tr>
                     )
                })
            }
        </table> 
    </div>

    )
};

// Add sidebar layout
Tutorings.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="ASESORES PAE">{page}</SidebarLayout>;
};

export default Tutorings;