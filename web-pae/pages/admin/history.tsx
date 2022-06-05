import type { NextPage } from 'next';
import React, { ReactElement, useEffect, useState } from 'react';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import styles from '@/css-admin/tutees.module.css';
import history from '@/css-admin/history.module.css';
import cx from 'classnames';
import useFetch from '@/hooks/useFetch';

const History: NextPage = () => {

  const [currentTab, setCurrentTab] = useState('');

  const [data, setData] = useState([]);

  let dummyData = [
    {
        "id": 15,
        "date": "2022-05-26",
        "hour": 8,
        "status": "PE",
        "is_online": true,
        "topic": "123",
        "doubt": null,
        "file": "http://localhost:8000/media/tutoring/Screenshot_from_2021-02-08_18-49-08.png",
        "tutor": {
            "registration_number": "a01731000",
            "email": "a01731000@tec.mx",
            "name": "Bryan G. Arellano",
            "completed_hours": 0,
            "is_active": true,
            "is_accepted": false,
            "user": "tutora01731000"
        },
        "student": {
            "registration_number": "a01731097",
            "email": "a01731097@tec.mx",
            "name": "Salvador Gaytan putito",
            "is_active": false,
            "user": "studenta01731097"
        },
        "subject": {
            "code": "L0173",
            "name": "TC3004B",
            "semester": 1
        }
    },
    {
        "id": 16,
        "date": "2022-05-30",
        "hour": 8,
        "status": "PE",
        "is_online": true,
        "topic": "123",
        "doubt": null,
        "file": "http://localhost:8000/media/tutoring/Screenshot_from_2021-02-08_18-49-08.png",
        "tutor": {
            "registration_number": "a01731000",
            "email": "a01731000@tec.mx",
            "name": "Bryan G. Arellano",
            "completed_hours": 0,
            "is_active": true,
            "is_accepted": false,
            "user": "tutora01731000"
        },
        "student": {
            "registration_number": "a01731097",
            "email": "a01731097@tec.mx",
            "name": "Karen Rugerio Armenta",
            "is_active": false,
            "user": "studenta01731097"
        },
        "subject": {
            "code": "L0173",
            "name": "F1004B.1",
            "semester": 1
        }
    },
    {
        "id": 17,
        "date": "2022-06-01",
        "hour": 9,
        "status": "PE",
        "is_online": true,
        "topic": "123",
        "doubt": null,
        "file": "http://localhost:8000/media/tutoring/Screenshot_from_2021-02-08_18-49-08_z3ZCK3o.png",
        "tutor": {
            "registration_number": "a01731005",
            "email": "a01731005@tec.mx",
            "name": "Bryan G. Arellano",
            "completed_hours": 0,
            "is_active": false,
            "is_accepted": false,
            "user": "tutora01731005"
        },
        "student": {
            "registration_number": "a01731097",
            "email": "a01731097@tec.mx",
            "name": "José Antonio Bobadilla García",
            "is_active": false,
            "user": "studenta01731097"
        },
        "subject": {
            "code": "L0173",
            "name": "TC2005B",
            "semester": 1
        }
    }
];

  const getData = () => {
    fetch('http://server-pae.azurewebsites.net/tutoring/')
    .then((resp) => resp.json())
    .then(function(data) {
      //console.log(data)
      setData(data);
      })
    .catch(function(error) {
      console.log(error);
    });
  } 
  
  useEffect(() => {
    getData()
  }, []);

  return (
    <div className={history.main}>
      <button className={history.Mainbutton}>Asesorías solicitadas</button>
      <table
          className={styles.tableRequest}
        >
        <thead>
          <tr className={cx(styles.headRow, styles.tr)}>
            <th className={styles.head}>Asesor</th>
            <th className={styles.head}>Alumno</th>
            <th className={styles.head}>Materia solicitada</th>
            <th className={styles.head}>Fecha</th>
            <th className={styles.head}>Hora</th>
          </tr>
        </thead>
        <tbody>
        { data.map(function (item,index) {
          
            let tutorName =  item.tutor != null ? item.tutor.name : "no hay tutor";
            let studentName =  item.student != null ? item.student.name : "no hay estudiante";
            let subjectName =  item.subject != null ? item.subject.name : "no hay materia";
            let date =  item.date != null ? item.date : "no hay fecha";
            let hour =  item.hour != null ? item.hour : "no hay hora";


              return (
                <tr  className={styles.tr}>
                  <td className={styles.td}>
                    <p>{tutorName}</p>
                  </td>
                  <td className={styles.td}>
                    <p>{studentName}</p>
                  </td>
                  <td className={styles.td}>
                    <p>{subjectName}</p>
                  </td>
                  <td className={styles.td}>
                    <p>{date}</p>
                  </td>
                  <td className={styles.td}>
                    <p>{hour}</p>
                  </td>
                </tr>
              );
            })}
        </tbody>
        </table>
    </div>
  )
};

// Add sidebar layout
History.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Historial de asesorías">{page}</SidebarLayout>;
};

export default History;
