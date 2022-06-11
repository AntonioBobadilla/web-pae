import ButtonTemplate from '@/components/button-template';
import history from '@/css-admin/history.module.css';
import styles from '@/css-admin/tutees.module.css';
import cx from 'classnames';
import React, { ReactElement, useEffect, useState } from 'react';
import CsvDownload from 'react-json-to-csv';
import SidebarLayout from '../../components/layouts/sidebar-layout';

const History = () => {
  const [currentTab, setCurrentTab] = useState<any>('');

  const [data, setData] = useState<any>([]);
  const [csvObj, setCsvObj] = useState<any>([]);

  const getData = () => {
    fetch('http://server-pae.azurewebsites.net/tutoring/')
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data)
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createObjToCSV = () => {
    const arrObj:
      | ((prevState: never[]) => never[])
      | {
          tutorName: any;
          studentName: any;
          subjectName: any;
          date: any;
          hour: any;
        }[] = [];
    data.map((item: any, index: any) => {
      const tutorName = item.tutor != null ? item.tutor.name : 'no hay tutor';

      const studentName =
        item.student != null ? item.student.name : 'no hay estudiante';

      const subjectName =
        item.subject != null ? item.subject.name : 'no hay materia';

      const date = item.date != null ? item.date : 'no hay fecha';
      const hour = item.hour != null ? item.hour : 'no hay hora';

      const obj = { tutorName, studentName, subjectName, date, hour };

      (arrObj as unknown as any[]).push(obj);
    });

    setCsvObj(arrObj);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    createObjToCSV();
  }, [data]);

  return (
    <div className={history.main}>
      <button className={history.Mainbutton}>Asesorías solicitadas</button>
      <table className={styles.tableRequest}>
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
          {data.map((item: any, index: any) => {
            const tutorName =
              item.tutor != null ? item.tutor.name : 'no hay tutor';
            const studentName =
              item.student != null ? item.student.name : 'no hay estudiante';
            const subjectName =
              item.subject != null ? item.subject.name : 'no hay materia';
            const date = item.date != null ? item.date : 'no hay fecha';
            const hour = item.hour != null ? item.hour : 'no hay hora';

            return (
              <tr className={styles.tr}>
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
          <CsvDownload
            className={history.csvButton}
            filename="historial-asesorias.csv"
            data={csvObj}
          />
        </ButtonTemplate>
      </div>
    </div>
  );
};

// Add sidebar layout
History.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Historial de asesorías">{page}</SidebarLayout>;
};

export default History;
