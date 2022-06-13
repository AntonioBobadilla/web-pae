import { Tutoring } from '@/components/card-info-student/types';
import ModifyLanguage from '@/components/dialogs/modify-language';
import ModifyPassword from '@/components/dialogs/modify-password';
import StudentPoll from '@/components/dialogs/student-poll';
import ToggleMenuStudent from '@/components/toggle-menu-student';
import createDate from '@/helpers/create-date';
import { selectEmail, selectID, selectName, selectToken } from '@/redux/user';
import { useTranslation } from 'next-i18next'; // add this
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'; // add this
import React, { ReactElement } from 'react';
import { useAppSelector } from 'store/hook';
import CardInformation from '../../components/card-information-student';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import Styles from '../../css/student/profile.module.css';

const Profile = () => {
  const { t } = useTranslation('student-profile'); // add this
  const [historystu, setHistoryStu] = React.useState<Tutoring[]>([]);
  const id = useAppSelector(selectID);
  const token = useAppSelector(selectToken);
  const [idTutoring, setIdTutoring] = React.useState<number>(0);
  const [modifyPasswordVisible, setModifyPasswordVisible] =
    React.useState(false);
  const [modifyLanguageVisible, setModifyLanguageVisible] =
    React.useState(false);

  const [studentPollVisible, setStudentPollVisible] = React.useState(false);
  const [questionsPoll, setQuestionsPoll] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (idTutoring !== 0) {
      fetch(`https://server-pae.azurewebsites.net/question/`, {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setQuestionsPoll(data);
          setStudentPollVisible(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [idTutoring]);

  React.useEffect(() => {
    fetch(
      `https://server-pae.azurewebsites.net/tutoring/?student=${id?.toLowerCase()}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`
        }
      }
    )
      .then((res) => res.json())
      .then((data: Tutoring[]) => {
        const newData: Tutoring[] = [...data];

        newData.map((item) => {
          console.log(item);
          if (item.status === 'CO' && item.has_feeback === false) {
            setIdTutoring(item.id);
          }
        });

        newData.sort((a, b) => {
          if (createDate(b.date, b.hour) > createDate(a.date, a.hour)) {
            return -1;
          }
          if (createDate(b.date, b.hour) < createDate(a.date, a.hour)) {
            return 1;
          }
          return 0;
        });
        setHistoryStu(newData);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const myUser = {
    name: useAppSelector(selectName),
    email: useAppSelector(selectEmail)
  };

  const onClickModifyPassword = () => {
    setModifyPasswordVisible(true);
  };

  const onClickModifyLanguage = () => {
    setModifyLanguageVisible(true);
  };

  return (
    <div className={Styles.main}>
      <ToggleMenuStudent
        onClickModifyPassword={onClickModifyPassword}
        onClickModifyLanguage={onClickModifyLanguage}
      />
      <div className={Styles.user}>
        <div className={Styles.icon}>
          <i className="bi bi-person-fill" style={{ color: '#f1f1f1' }} />
        </div>
        <p className={Styles.userName}>{myUser.name}</p>
        <p className={Styles.id}>{myUser.email}</p>
      </div>
      <p className={Styles.tutorship}>{t('Asesorías')}</p>
      <div className={Styles.cardInfo}>
        <CardInformation historystu={historystu} />
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
      {studentPollVisible && (
        <StudentPoll
          questions={questionsPoll}
          visible={studentPollVisible}
          setVisible={setStudentPollVisible}
          idTutoring={idTutoring}
        />
      )}
    </div>
  );
};

// Add sidebar layout
Profile.getLayout = function getLayout(page: ReactElement) {
  const { t } = useTranslation('student-profile'); // add this
  return <SidebarLayout title={t('Mi perfil')}>{page}</SidebarLayout>;
};

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'tutor-profile',
        'student-profile',
        'student-schedule-tutoring'
      ]))
    }
  };
}

export default Profile;
