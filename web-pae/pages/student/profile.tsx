import ModifyLanguage from '@/components/dialogs/modify-language';
import ModifyPassword from '@/components/dialogs/modify-password';
import ToggleMenuStudent from '@/components/toggle-menu-student';
import type { NextPage } from 'next';
import React, { ReactElement } from 'react';
import CardInformationStu from '../../components/card-information-student';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import Styles from '../../css/student/profile.module.css';

const Profile: NextPage = () => {
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
    <div className={Styles.content}>
      <ToggleMenuStudent
        onClickModifyPassword={onClickModifyPassword}
        onClickModifyLanguage={onClickModifyLanguage}
      />
      <h1>Profile</h1>
      <div className={Styles.cardInfo}>
        <CardInformationStu />
        <CardInformationStu />
        <CardInformationStu />
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
