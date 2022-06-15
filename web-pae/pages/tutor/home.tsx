import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'; //translate the text
import { ReactElement } from 'react';
import ImageCard from '../../components/image-card';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import styles from '../../css/tutor/home.module.css';



const Home = () => {

  const { t } = useTranslation('student-home');

  return(
    <div className={styles.cards}>
    <div className={styles.card}>
      <ImageCard
        image="/images/profileTutor.jpg"
        description={t('Profile')}
        path="/tutor/profile"
      />
    </div>
    <div className={styles.card}>
      <ImageCard
        image="/images/history.jpeg"
        description={t('Assigned tutorings')}
        path="/tutor/assigned-tutorings"
      />
    </div>
  </div>
  )};

// Add sidebar layout
Home.getLayout = function getLayout(page: ReactElement) {
  const { t } = useTranslation('student-home');
  return <SidebarLayout title={t('HOME')}>{page}</SidebarLayout>;
};

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['student-home',  'tutor-profile']))
    }
  };
}

export default Home;
