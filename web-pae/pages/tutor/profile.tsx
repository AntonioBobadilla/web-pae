import type { NextPage } from 'next';
import React, { ReactElement } from 'react';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next'; 

const Profile: NextPage = () => <h1>PROFILE</h1>;

// Add sidebar layout
Profile.getLayout = function getLayout(page: ReactElement) {
  const { t } = useTranslation('tutor-profile');
  return <SidebarLayout title={t('My Profile')}>{page}</SidebarLayout>;

};

export async function getStaticProps({ locale }) { 
  return {
    props: {
      ...(await serverSideTranslations(locale, ['tutor-profile']))
    }
  };
}

export default Profile;
