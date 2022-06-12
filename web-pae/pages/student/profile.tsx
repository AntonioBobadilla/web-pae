import ModifyLanguage from '@/components/dialogs/modify-language';
import ModifyPassword from '@/components/dialogs/modify-password';
import ToggleMenuStudent from '@/components/toggle-menu-student';
import { selectEmail, selectName } from '@/redux/user';
import React, { ReactElement } from 'react';
import { useAppSelector } from 'store/hook';
import CardInformation from '../../components/card-information-student';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import Styles from '../../css/student/profile.module.css';
import { useTranslation } from 'next-i18next';  // add this
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'; // add this


const Profile = () => {
  const { t } = useTranslation('student-profile'); // add this

  const myUser = {
    name: useAppSelector(selectName),
    email: useAppSelector(selectEmail)
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
      <p className={Styles.tutorship}>{t('Asesorías')}</p>
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
  const { t } = useTranslation('student-profile'); // add this
  return <SidebarLayout title={t('Mi perfil')}>{page}</SidebarLayout>;
};


export async function getStaticProps({ locale }) { 
  return {
    props: {
      ...(await serverSideTranslations(locale, ['student-profile']))
    }
  };
}

export default Profile;
