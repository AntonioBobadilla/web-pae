import type { NextPage } from 'next';
import React, { ReactElement, useEffect, useState } from 'react';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import styles from '@/css-admin/tutees.module.css';
import history from '@/css-admin/history.module.css';
import cx from 'classnames';
import useFetch from '@/hooks/useFetch';
import CsvDownload from 'react-json-to-csv'
import ButtonTemplate from '@/components/button-template';

const History: NextPage = () => {

  const [currentTab, setCurrentTab] = useState<any>('');

  const [data, setData] = useState<any>([]);
  const [csvObj, setCsvObj] = useState<any>([]);



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

  const createObjToCSV = () => {
      let arrObj: ((prevState: never[]) => never[]) | { tutorName: any; studentName: any; subjectName: any; date: any; hour: any; }[] = [];
      const utf8 = require('utf8');
      data.map(function (item: any,index: any) {

        let tutorName =  utf8.encode(item.tutor != null ? item.tutor.name : "no hay tutor");
        let studentName =  utf8.encode(item.student != null ? item.student.name : "no hay estudiante");
        let subjectName =  utf8.encode(item.subject != null ? item.subject.name : "no hay materia");
        let date = utf8.encode(item.date != null ? item.date : "no hay fecha");
        let hour =  utf8.encode(item.hour != null ? item.hour : "no hay hora");

        let obj = {tutorName, studentName, subjectName, date, hour};

        (arrObj as unknown as any[]).push(obj)
      })
      
      setCsvObj(arrObj);
  }
  
  useEffect(() => {
    getData()
  }, []);

  useEffect(() => {
    createObjToCSV();
  }, [data])

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
        { data.map(function (item: any,index: any) {

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
        <div className={history.buttonWrapper}>
          <ButtonTemplate variant="primary">
            <CsvDownload className={history.csvButton} filename={"historial-asesorias.csv"} data={csvObj} />
          </ButtonTemplate>
        </div>
    </div>
  )
};

// Add sidebar layout
History.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Historial de asesorías">{page}</SidebarLayout>;
};

export default History;
