import ButtonTemplate from '@/components/button-template';
import history from '@/css-admin/history.module.css';
import styles from '@/css-admin/tutees.module.css';
import createDate from '@/helpers/create-date';
import formatTime from '@/helpers/format-time';
import { selectToken } from '@/redux/user';
import cx from 'classnames';
import { ReactElement, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CsvDownload from 'react-json-to-csv';
import { useAppSelector } from 'store/hook';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const History = () => {
  const [currentTab, setCurrentTab] = useState<any>('');
  const { t } = useTranslation('admin-history');
  const [data, setData] = useState<any>([]);
  const [csvObj, setCsvObj] = useState<any>([]);
  const token = useAppSelector(selectToken);

  const getData = () => {
    fetch('https://server-pae.azurewebsites.net/tutoring/', {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`
      }
    })
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data)
        const newData = [...data];
        newData.sort((a, b) => {
          if (createDate(b.date, b.hour) < createDate(a.date, a.hour)) {
            return -1;
          }
          if (createDate(b.date, b.hour) > createDate(a.date, a.hour)) {
            return 1;
          }
          return 0;
        });
        setData(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeStatus = (id: number, e: any) => {
    toast('Cambiando estado...', {
      icon: '✔️'
    });
    // console.log(e.target.value, id);
    fetch(
      `https://server-pae.azurewebsites.net/updatetutoring/${id}/${e.target.value}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Token ${token}`
        }
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data);
        getData();
        toast.success('Cambio de estado exitoso');
      })
      .catch((error) => {
        toast.error('Error al cambiar el estado');
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
      const tutorName =
        item.tutor != null ? item.tutor.name : t('There is no tutor');

      const studentName =
        item.student != null ? item.student.name : t('There is no student');

      const subjectName =
        item.subject != null ? item.subject.name : t('There is no subject');

      const date = item.date != null ? item.date : t('There is no date');
      const hour = item.hour != null ? item.hour : t('There is no hour');

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
      <button className={history.Mainbutton}>{t('Requested tutorings')}</button>
      <table className={styles.tableRequest}>
        <thead>
          <tr className={cx(styles.headRow, styles.tr)}>
            <th className={styles.head}>{t('Tutor')}</th>
            <th className={styles.head}>{t('Student')}</th>
            <th className={styles.head}>{t('Requested subject')}</th>
            <th className={styles.head}>{t('Date')}</th>
            <th className={styles.head}>{t('Hour')}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index: any) => {
            const tutorName =
              item.tutor != null ? item.tutor.name : t('There is no tutor');
            const studentName =
              item.student != null
                ? item.student.name
                : t('There is no student');
            const subjectName =
              item.subject != null
                ? item.subject.name
                : t('There is no subject');
            const date = item.date != null ? item.date : t('There is no date');
            const hour = item.hour != null ? item.hour : t('There is no hour');
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
                  <p>{formatTime(hour)}</p>
                </td>
                <td className={styles.td}>
                  <select
                    name="status"
                    id="status_selected"
                    value={status}
                    onChange={(e) => changeStatus(item.id, e)}
                  >
                    <option value="PE">Pendiente</option>
                    <option value="AP">Aprobada</option>
                    <option value="CO">Completada</option>
                    <option value="CA">Cancelada</option>
                  </select>
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
  const { t } = useTranslation('admin-history');
  return <SidebarLayout title={t('Tutoring records')}>{page}</SidebarLayout>;
};

export async function getStaticProps({ locale }: { locale: any }) {

  //traductor pagina principal
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'admin-history',
        'tutor-profile'
      ]))
    }
  };
}

export default History;
