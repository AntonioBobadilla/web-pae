import ModifyLanguage from '@/components/dialogs/modify-language';
import ModifyPassword from '@/components/dialogs/modify-password';
import ModifySubjects from '@/components/dialogs/modify-subjects';
import ProgressBarHours from '@/components/progress-bar-hours';
import ToggleMenu from '@/components/toggle-menu';
import { selectEmail, selectName } from '@/redux/user';
import type { NextPage } from 'next';
import React, { ReactElement } from 'react';
import { useAppSelector } from 'store/hook';
import CardInformation from '../../components/card-information';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import Styles from '../../css/tutor/profile.module.css';

const Profile: NextPage = () => {
  const myUser = {
    name: useAppSelector(selectName),
    email: useAppSelector(selectEmail),
    weekHours: '2',
    totalHours: '15'
  };
  const progress = {
    weekHours: 2,
    totalHours: 50
  };
  const [modifyPasswordVisible, setModifyPasswordVisible] =
    React.useState(false);
  const [modifyLanguageVisible, setModifyLanguageVisible] =
    React.useState(false);
  const [modifySubjectsVisible, setModifySubjectsVisible] =
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

  return (
    <div className={Styles.main}>
      <ToggleMenu
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
          <span className={Styles.progressText}>
            Progreso de horas semanales
          </span>
          <div className={Styles.hoursContainer}>
            <div className={Styles.bar}>
              <ProgressBarHours progress={progress.weekHours} total={5} />
            </div>
            <span className={Styles.progressValue}>{progress.weekHours}/5</span>
          </div>
        </div>
        <div className={Styles.totalHours}>
          <span className={Styles.progressText}>Progreso de horas totales</span>
          <div className={Styles.hoursContainer}>
            <div className={Styles.bar}>
              <ProgressBarHours progress={progress.totalHours} total={180} />
            </div>
            <span className={Styles.progressValue}>
              {progress.totalHours}/180
            </span>
          </div>
        </div>
      </div>
      <p className={Styles.tutorship}>Asesorías</p>
      <div className={Styles.cardInfo}>
        <CardInformation />
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
        />
      )}
    </div>
  );
};

// Add sidebar layout
Profile.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Mi perfil">{page}</SidebarLayout>;
};
export default Profile;
