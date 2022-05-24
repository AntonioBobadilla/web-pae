import type { NextPage } from 'next';
import React, { ReactElement } from 'react';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import ImageCard from '../../components/card-info';
import Styles from '../../css/tutor/profile.module.css';
import CardInformation from '../../components/card-information';

const Profile: NextPage = () => (
  <div>
    <h1>PROFILE</h1>
    <div className={Styles.cardInfo}>
      <CardInformation />
    </div>
  </div>
);

// Add sidebar layout
Profile.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Mi perfil">{page}</SidebarLayout>;
};
export default Profile;
