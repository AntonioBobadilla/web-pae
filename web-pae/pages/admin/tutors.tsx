import SuccessAcceptTutee from '@/components/dialogs/accept-tutee';
import DeniedTutee from '@/components/dialogs/denied-tutee';
import Calendar from '@/components/dialogs/view-calendar-tutee';
import Tabs from '@/components/tabs';
import styles from '@/css-admin/tutees.module.css';
import { selectToken } from '@/redux/user';
import cx from 'classnames';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ReactElement, useEffect, useState } from 'react';
import { useAppSelector } from 'store/hook';
import SidebarLayout from '../../components/layouts/sidebar-layout';

const Tutorings = () => {
  const [asesores, setAsesores] = useState<any>([]);
  const [solicitudesAsesores, setSolicitudesAsesores] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [flag, setFlag] = useState<any>(false);
  const [successAcceptTuteeVisible, setsuccessAcceptTuteeVisible] =
    useState<any>(false);
  const [DeniedTuteeVisible, setdeniedTuteeVisible] = useState<any>(false);
  const [confirmDelete, setConfirmDelete] = useState<any>(false);
  const [TuteeIdToDelete, setTuteeIdToDelete] = useState<any>(0);
  const [pending, setPending] = useState<any>(true);
  const [ViewCalendar, setviewCalendar] = useState<any>(false);
  const [schedules, setSchedules] = useState<any>([]);
  const [TutorName, setTutorName] = useState<any>([]);
  const [inputSearch, setInputSearch] = useState<any>('');
  const [filteredArrayAsesores, setfilteredArrayAsesores] = useState<any>([]);
  const [filteredArraySolicitudes, setfilteredArraySolicitudes] = useState<any>(
    []
  );
  const [typing, setTyping] = useState<any>(false);
  const [currentTab, setCurrentTab] = useState<any>('');
  const { t } = useTranslation('admin-tutors');
  const removeDuplicates = (arr: any) =>
    arr.filter((item: any, index: any) => arr.indexOf(item) === index);
  const token = useAppSelector(selectToken);

  useEffect(() => {
    if (confirmDelete == true) del();
  }, [confirmDelete]); // <-- here put the parameter to listen

  const onClickSuccessAcceptTutee = () => {
    setsuccessAcceptTuteeVisible(true);
  };

  const onClickDeniedTutee = () => {
    setdeniedTuteeVisible(true);
  };

  const onClickViewCalendar = () => {
    setviewCalendar(true);
  };

  const filterData = () => {
    console.log(flag);
    if (data != []) {
      data.forEach((item: { is_accepted: any }) => {
        if (item.is_accepted) {
          setAsesores((asesores: any) => [...asesores, item]);
        } else {
          setSolicitudesAsesores((solicitudesAsesores: any) => [
            ...solicitudesAsesores,
            item
          ]);
        }
      });
      setFlag(true);
    }
  };

  const getTuteesFromApi = () => {
    fetch('https://server-pae.azurewebsites.net/tutor/', {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`
      }
    })
      .then((resp) => resp.json())
      .then((data) => {
        setPending(false);
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createDataArray = () => {
    // console.log(solicitudesAsesores);
  };

  useEffect(() => {
    filterData();
  }, [data]);

  useEffect(() => {
    getTuteesFromApi();
    setCurrentTab('tutors');
    // createDataArray();
  }, []);

  const tutorsButton = () => {
    setCurrentTab('tutors');
  };

  const requestButton = () => {
    setCurrentTab('request');
  };

  const acceptTutee = (id: any) => {
    fetch(`https://server-pae.azurewebsites.net/tutorisaccepted/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      },
      body: JSON.stringify({ is_accepted: true })
    })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error('could not make PUT request for that endpoint');
        }
        return res.json();
      })
      .then((data) => {
        console.log('ok');
        onClickSuccessAcceptTutee();
        getTuteesFromApi();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const deleteTutee = (id: any) => {
    setTuteeIdToDelete(id);
    onClickDeniedTutee();
  };

  const del = () => {
    fetch(`https://server-pae.azurewebsites.net/tutor/${TuteeIdToDelete}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error('could not make POST request for that endpoint');
        } else if (res.status === 204) {
          getTuteesFromApi();
        }
        return res.json();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const renderFilterArrayAsesores = () => {
    if (filteredArrayAsesores.length != 0) {
      console.log('RE');
      return (
        <table
          className={
            currentTab == 'tutors' ? styles.tableTutors : styles.hidden
          }
        >
          <thead>
            <tr className={cx(styles.headRow, styles.tr)}>
              <th className={styles.head}>{t('Registration number')}</th>
              <th className={styles.head}>{t('Name')}</th>
              <th className={styles.head}>{t('Major')}</th>
              <th className={styles.head}>{t('Subjects for tutoring')}</th>
              <th className={styles.head}>{t('Number of hours')}</th>
              <th className={styles.head}>{t('Schedule')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredArrayAsesores.map((item: any, index: any) => (
              <tr key={index} className={styles.tr}>
                <td className={styles.td}>
                  <p>{item.registration_number}</p>
                </td>
                <td className={styles.td}>
                  <p>{item.name}</p>
                </td>
                <td className={styles.td}>
                  <p>ITC</p>
                </td>
                <td className={styles.td}>
                  {item.subjects.map((subject: any, index: any) => (
                    <p key={index}>{subject.subject} </p>
                  ))}
                </td>
                <td className={styles.td}>
                  <p>{item.completed_hours}/80</p>
                </td>
                <td className={styles.td}>
                  <button
                    onClick={() => showCalendar(item.schedules, item.name)}
                    className={styles.button}
                  >
                    {t('See')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    console.log('no re');
    return (
      <div
        className={currentTab == 'tutors' ? styles.tableRequest : styles.hidden}
      >
        <table>
          <thead>
            <tr className={cx(styles.headRow, styles.tr)}>
              <th className={styles.head}>{t('Registration number')}</th>
              <th className={styles.head}>{t('Name')}</th>
              <th className={styles.head}>{t('Major')}</th>
              <th className={styles.head}>{t('Subjects for tutoring')}</th>
              <th className={styles.head}>{t('Number of hours')}</th>
              <th className={styles.head}>{t('Schedule')}</th>
              <th className={styles.head} />
            </tr>
          </thead>
          <tbody />
        </table>
        <p className={styles.emptyMessage}>No hay asesores disponibles</p>
      </div>
    );
  };

  const renderFilterArraySolicitudes = () => {
    if (filteredArraySolicitudes.length != 0) {
      return (
        <table
          className={
            currentTab == 'request' ? styles.tableRequest : styles.hidden
          }
        >
          <thead>
            <tr className={cx(styles.headRow, styles.tr)}>
              <th className={styles.head}>{t('Registration number')}</th>
              <th className={styles.head}>{t('Name')}</th>
              <th className={styles.head}>{t('Major')}</th>
              <th className={styles.head}>{t('Subjects for tutoring')}</th>
              <th className={styles.head}>{t('Number of hours')}</th>
              <th className={styles.head}>{t('Accept/reject')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredArraySolicitudes.map((item: any, index: any) => (
              <tr key={index} className={styles.tr}>
                <td className={styles.td}>
                  <p>{item.registration_number}</p>
                </td>
                <td className={styles.td}>
                  <p>{item.name}</p>
                </td>
                <td className={styles.td}>
                  <p>ITC</p>
                </td>
                <td className={styles.td}>
                  {item.subjects.map((subject: any, index: any) => (
                    <p key={index}>{subject.subject} </p>
                  ))}
                </td>
                <td className={styles.td}>
                  <button
                    onClick={() => showCalendar(item.schedules, item.name)}
                    className={styles.button}
                  >
                    {t('See')}
                  </button>
                </td>
                <td className={styles.td}>
                  <div className={styles.flex}>
                    <button
                      onClick={() => acceptTutee(item.registration_number)}
                      className={styles.accept}
                    >
                      {t('Accept')}
                    </button>
                    <button
                      onClick={() => deleteTutee(item.registration_number)}
                      className={styles.denied}
                    >
                      {t('Reject')}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return (
      <div
        className={
          currentTab == 'request' ? styles.tableRequest : styles.hidden
        }
      >
        <table>
          <thead>
            <tr className={cx(styles.headRow, styles.tr)}>
              <th className={styles.head}>{t('Registration number')}</th>
              <th className={styles.head}>{t('Name')}</th>
              <th className={styles.head}>{t('Major')}</th>
              <th className={styles.head}>{t('Subjects for tutoring')}</th>
              <th className={styles.head}>{t('Number of hours')}</th>
              <th className={styles.head}>{t('Accept/reject')}</th>
            </tr>
          </thead>
          <tbody />
        </table>
        <p className={styles.emptyMessage}>
          {t('There is no requests available')}
        </p>
      </div>
    );
  };

  const conditionalRenderingAsesores = () => {
    if (!typing) {
      return renderAsesores();
    }
    if (typing) {
      return renderFilterArrayAsesores();
    }
  };

  const conditionalRenderingSolicitudes = () => {
    console.log('es: ', typing);
    if (!typing) {
      return renderSolicitudesAsesores();
    }
    if (typing) {
      return renderFilterArraySolicitudes();
    }
  };

  const filterAsesoresOfInput = (string: any) => {
    const RequestsCopy = [...asesores];
    console.log(RequestsCopy);
    const filteredArrayAsesores = RequestsCopy.filter((request) =>
      request.name.toLowerCase().includes(string.toLowerCase())
    );
    console.log('res: ', filteredArrayAsesores);
    setfilteredArrayAsesores(filteredArrayAsesores);
  };

  const filterSolicitudesOfInput = (string: any) => {
    const RequestsCopy = [...solicitudesAsesores];
    console.log(RequestsCopy);
    const filteredArrayAsesores = RequestsCopy.filter((request) =>
      request.name.toLowerCase().includes(string.toLowerCase())
    );
    console.log('res: ', filteredArrayAsesores);
    setfilteredArraySolicitudes(filteredArrayAsesores);
  };

  const handleSearchAsesores = (e: any) => {
    if (e.target.value != '') {
      setTyping(true);
      setInputSearch(e.target.value);
      filterAsesoresOfInput(e.target.value);
    } else {
      setTyping(false);
    }
    conditionalRenderingAsesores();
  };

  const handleSearchSolicitudes = (e: any) => {
    if (e.target.value != '') {
      setTyping(true);
      setInputSearch(e.target.value);
      filterSolicitudesOfInput(e.target.value);
    } else {
      setTyping(false);
    }
    conditionalRenderingSolicitudes();
  };

  const showCalendar = (schedules: any, name: any) => {
    setSchedules(schedules);
    setTutorName(name);
    onClickViewCalendar();
  };

  const renderAsesores = () => {
    if (asesores.length != 0) {
      return (
        <table
          className={
            currentTab == 'tutors' ? styles.tableTutors : styles.hidden
          }
        >
          <thead>
            <tr className={cx(styles.headRow, styles.tr)}>
              <th className={styles.head}>{t('Registration number')}</th>
              <th className={styles.head}>{t('Name')}</th>
              <th className={styles.head}>{t('Major')}</th>
              <th className={styles.head}>{t('Subjects for tutoring')}</th>
              <th className={styles.head}>{t('Number of hours')}</th>
              <th className={styles.head}>{t('Schedule')}</th>
            </tr>
          </thead>
          <tbody>
            {asesores.map((item: any, index: any) => (
              <tr key={index} className={styles.tr}>
                <td className={styles.td}>
                  <p>{item.registration_number}</p>
                </td>
                <td className={styles.td}>
                  <p>{item.name}</p>
                </td>
                <td className={styles.td}>
                  <p>ITC</p>
                </td>
                <td className={styles.td}>
                  {item.subjects.map((subject: any, index: any) => (
                    <p key={index}>{subject.subject} </p>
                  ))}
                </td>
                <td className={styles.td}>
                  <p>{item.completed_hours}/80</p>
                </td>
                <td className={styles.td}>
                  <button
                    onClick={() => showCalendar(item.schedules, item.name)}
                    className={styles.button}
                  >
                    {t('See')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return (
      <div
        className={
          currentTab == 'request' ? styles.tableRequest : styles.hidden
        }
      >
        <table>
          <thead>
            <tr className={cx(styles.headRow, styles.tr)}>
              <th className={styles.head}>{t('Registration number')}</th>
              <th className={styles.head}>{t('Name')}</th>
              <th className={styles.head}>{t('Major')}</th>
              <th className={styles.head}>{t('Subjects for tutoring')}</th>
              <th className={styles.head}>{t('Number of hours')}</th>
              <th className={styles.head}>{t('Schedule')}</th>
              <th className={styles.head} />
            </tr>
          </thead>
          <tbody />
        </table>
        <p className={styles.emptyMessage}>
          {t('There is no tutors avaliable')}
        </p>
      </div>
    );
  };

  const renderSolicitudesAsesores = () => {
    if (solicitudesAsesores.length != 0) {
      return (
        <table
          className={
            currentTab == 'request' ? styles.tableRequest : styles.hidden
          }
        >
          <thead>
            <tr className={cx(styles.headRow, styles.tr)}>
              <th className={styles.head}>{t('Registration number')}</th>
              <th className={styles.head}>{t('Name')}</th>
              <th className={styles.head}>{t('Major')}</th>
              <th className={styles.head}>{t('Subjects for tutoring')}</th>
              <th className={styles.head}>{t('Number of hours')}</th>
              <th className={styles.head}>{t('Accept/reject')}</th>
            </tr>
          </thead>
          <tbody>
            {solicitudesAsesores.map((item: any, index: any) => (
              <tr key={index} className={styles.tr}>
                <td className={styles.td}>
                  <p>{item.registration_number}</p>
                </td>
                <td className={styles.td}>
                  <p>{item.name}</p>
                </td>
                <td className={styles.td}>
                  <p>ITC</p>
                </td>
                <td className={styles.td}>
                  {item.subjects.map((subject: any, index: any) => (
                    <p key={index}>{subject.subject} </p>
                  ))}
                </td>
                <td className={styles.td}>
                  <button
                    onClick={() => showCalendar(item.schedules, item.name)}
                    className={styles.button}
                  >
                    {t('See')}
                  </button>
                </td>
                <td className={styles.td}>
                  <div className={styles.flex}>
                    <button
                      onClick={() => acceptTutee(item.registration_number)}
                      className={styles.accept}
                    >
                      {t('Accept')}
                    </button>
                    <button
                      onClick={() => deleteTutee(item.registration_number)}
                      className={styles.denied}
                    >
                      {t('Reject')}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return (
      <div
        className={
          currentTab == 'request' ? styles.tableRequest : styles.hidden
        }
      >
        <table>
          <thead>
            <tr className={cx(styles.headRow, styles.tr)}>
              <th className={styles.head}>{t('Registration number')}</th>
              <th className={styles.head}>{t('Name')}</th>
              <th className={styles.head}>{t('Major')}</th>
              <th className={styles.head}>{t('Subjects for tutoring')}</th>
              <th className={styles.head}>{t('Number of hours')}</th>
              <th className={styles.head}>{t('Accept/reject')}</th>
            </tr>
          </thead>
          <tbody />
        </table>
        <p className={styles.emptyMessage}>
          {t('There is no requests available')}
        </p>
      </div>
    );
  };

  const renderInput = (option: any) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'right',
        width: '80%',
        height: 'auto'
      }}
    >
      <p
        style={{
          fontSize: '20px',
          color: '#3f3b3b',
          fontWeight: '400'
        }}
      >
        {t('Search')}
      </p>
      <input
        style={{
          border: 'none',
          width: '25%',
          height: '35px',
          borderRadius: '5px',
          color: '#7c7c7c',
          fontWeight: '500',
          marginRight: '20px',
          marginTop: '15px',
          marginBottom: '15px',
          fontSize: '14px',
          paddingLeft: '15px',
          backgroundColor: 'rgb(241, 241, 241)'
        }}
        type="text"
        placeholder={t('NAME*')}
        onChange={
          currentTab == 'request'
            ? handleSearchSolicitudes
            : handleSearchAsesores
        }
      />
    </div>
  );

  return (
    <div className={styles.main}>
      {currentTab == 'request' ? renderInput(1) : renderInput(2)}
      <div className={styles.tabs}>
        <div className={styles.tutorTab}>
          <Tabs
            handleClick={tutorsButton}
            text={t('My tutors')}
            active={currentTab == 'tutors'}
          />
        </div>
        <div className={styles.requestTab}>
          <Tabs
            handleClick={requestButton}
            text={t('Requests')}
            active={currentTab == 'request'}
          />
        </div>
      </div>
      <div className={styles.tables}>
        {pending && <div>{t('Loading data')}</div>}
        {currentTab == 'request'
          ? conditionalRenderingSolicitudes()
          : conditionalRenderingAsesores()}
        {}
      </div>
      {successAcceptTuteeVisible && (
        <SuccessAcceptTutee
          visible={successAcceptTuteeVisible}
          setVisible={setsuccessAcceptTuteeVisible}
        />
      )}
      {DeniedTuteeVisible && (
        <DeniedTutee
          visible={DeniedTuteeVisible}
          setVisible={setdeniedTuteeVisible}
          setConfirmDelete={setConfirmDelete}
        />
      )}

      {ViewCalendar && (
        <Calendar
          visible={ViewCalendar}
          setVisible={setviewCalendar}
          schedules={schedules}
          tutorName={TutorName}
        />
      )}
    </div>
  );
};

// Add sidebar layout
Tutorings.getLayout = function getLayout(page: ReactElement) {
  const { t } = useTranslation('admin-tutors');
  return <SidebarLayout title={t('PAE TUTORS')}>{page}</SidebarLayout>;
};

export async function getStaticProps({ locale }: { locale: any }) {
  //traductor pagina principal
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'admin-tutors',
        'tutor-profile'
      ]))
    }
  };
}
export default Tutorings;
