import ModifyPassword from '@/components/dialogs/modify-password';
import type { NextPage } from 'next';
import React, { ReactElement } from 'react';
import SidebarLayout from '../../components/layouts/sidebar-layout';

const Profile: NextPage = () => <ModifyPassword />;

// Add sidebar layout
Profile.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Mi perfil">{page}</SidebarLayout>;
};

export default Profile;
