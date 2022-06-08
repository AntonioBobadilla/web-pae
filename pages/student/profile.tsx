import ModifyLanguage from '@/components/dialogs/modify-language';
import ModifyPassword from '@/components/dialogs/modify-password';
import ToggleMenuStudent from '@/components/toggle-menu-student';
import { selectEmail, selectName } from '@/redux/user';
import type { NextPage } from 'next';
import React, { ReactElement } from 'react';
import { useAppSelector } from 'store/hook';
import CardInformation from '../../components/card-information-student';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import Styles from '../../css/student/profile.module.css';

const Profile: NextPage = () => {
  const myUser = {
    name: useAppSelector(selectName),
    email: useAppSelector(selectEmail)
  };
  const progress = {
    weekHours: 2,
    totalHours: 50
  };
  const [modifyPasswordVisible, setModifyPasswordVisible] =
    React.useState(false);
  const [modifyLanguageVisible, setModifyLanguageVisible] =
    React.useState(false);

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
    </div>
  );
};

// Add sidebar layout
Profile.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Mi perfil">{page}</SidebarLayout>;
};
export default Profile;
