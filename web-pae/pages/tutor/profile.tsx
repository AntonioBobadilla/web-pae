import { Tutoring, TutorObject } from '@/components/card-info-student/types';
import ModifyLanguage from '@/components/dialogs/modify-language';
import ModifyPassword from '@/components/dialogs/modify-password';
import ModifySchedule from '@/components/dialogs/modify-schedule';
import ModifySubjects from '@/components/dialogs/modify-subjects';
import ProgressBarHours from '@/components/progress-bar/progress-bar-hours';
import ToggleMenu from '@/components/toggle-menu';
import createDate from '@/helpers/create-date';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { ReactElement, useEffect, useState } from 'react';
import { useAppSelector } from 'store/hook';
import {
  selectEmail,
  selectID,
  selectName,
  selectToken
} from 'store/reducers/user';
import CardInformation from '../../components/card-information';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import Styles from '../../css/tutor/profile.module.css';

const Profile = () => {
  const [data, setData] = useState<TutorObject>();

  const [history, setHistory] = React.useState<Tutoring[]>([]);
  const myUser = {
    id: useAppSelector(selectID),
    name: useAppSelector(selectName),
    email: useAppSelector(selectEmail),
    weekHours: '2',
    totalHours: '15'
  };

  const token = useAppSelector(selectToken);

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    fetch(
      `https://server-pae.azurewebsites.net/tutoring/?tutor=${myUser.id?.toLowerCase()}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`
        }
      }
    )
      .then((res) => res.json())
      .then((data) => {
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
        setHistory(newData);
      })
      .catch((err) => console.log(err.message));
  }, []);
  const progress = {
    weekHours: data?.weekly_completed_hours ?? 0,
    totalHours: data?.completed_hours ?? 0
  };

  const [modifyPasswordVisible, setModifyPasswordVisible] =
    React.useState(false);
  const [modifyLanguageVisible, setModifyLanguageVisible] =
    React.useState(false);
  const [modifySubjectsVisible, setModifySubjectsVisible] =
    React.useState(false);
  const [modifyScheduleVisible, setModifyScheduleVisible] =
    React.useState(false);

  const onClickModifyPassword = () => {
    setModifyPasswordVisible(true);
  };

  const onClickModifyLanguage = () => {
    setModifyLanguageVisible(true);
  };

  const onClickModifySubjects = () => {
    setModifySubjectsVisible(true);
  };

  const onClickModifySchedule = () => {
    setModifyScheduleVisible(true);
  };
  const getData = () => {
    fetch(
      `https://server-pae.azurewebsites.net/tutor/${myUser.id?.toLowerCase()}`,
      {
        method: 'GET',

        headers: {
          Authorization: `Token ${token}`
        }
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data)
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { t } = useTranslation('tutor-profile');

  return (
    <div className={Styles.main}>
      <ToggleMenu
        onClickModifySchedule={onClickModifySchedule}
        onClickModifyPassword={onClickModifyPassword}
        onClickModifyLanguage={onClickModifyLanguage}
        onClickModifySubjects={onClickModifySubjects}
      />
      <div className={Styles.user}>
        <div className={Styles.icon}>
          <i className="bi bi-person-fill" style={{ color: '#f1f1f1' }} />
        </div>
        <p className={Styles.userName}>{myUser.name}</p>
        <p className={Styles.id}>{myUser.email}</p>
      </div>
      <div className={Styles.progress}>
        <div className={Styles.weekHours}>
          <span className={Styles.progressText}>{t('Weekly Progress')}</span>
          <div className={Styles.hoursContainer}>
            <div className={Styles.bar}>
              <ProgressBarHours progress={progress.weekHours} total={5} />
            </div>
            <span className={Styles.progressValue}>{progress.weekHours}/5</span>
          </div>
        </div>
        <div className={Styles.totalHours}>
          <span className={Styles.progressText}>{t('Total Progress')}</span>
          <div className={Styles.hoursContainer}>
            <div className={Styles.bar}>
              <ProgressBarHours progress={progress.totalHours} total={60} />
            </div>
            <span className={Styles.progressValue}>
              {progress.totalHours}/60
            </span>
          </div>
        </div>
      </div>
      <p className={Styles.tutorship}>{t('Tutoring')}</p>
      <div className={Styles.cardInfo}>
        <CardInformation history={history} />
      </div>
      {modifyPasswordVisible && (
        <ModifyPassword
          visible={modifyPasswordVisible}
          setVisible={setModifyPasswordVisible}
        />
      )}
      {modifyLanguageVisible && (
        <ModifyLanguage
          visible={modifyLanguageVisible}
          setVisible={setModifyLanguageVisible}
        />
      )}
      {modifySubjectsVisible && (
        <ModifySubjects
          visible={modifySubjectsVisible}
          setVisible={setModifySubjectsVisible}
          id={myUser.id}
        />
      )}
      {modifyScheduleVisible && (
        <ModifySchedule
          visible={modifyScheduleVisible}
          setVisible={setModifyScheduleVisible}
          id={myUser.id}
        />
      )}
    </div>
  );
};

// Add sidebar layout
Profile.getLayout = function getLayout(page: ReactElement) {
  const { t } = useTranslation('tutor-profile');
  return <SidebarLayout title={t('My Profile')}>{page}</SidebarLayout>;
};

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'toggle-menu',
        'tutor-profile',
        'student-profile'
      ]))
    }
  };
}

export default Profile;
