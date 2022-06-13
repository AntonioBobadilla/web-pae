/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ConfirmationPopup from '../../components/confirm-popup';
import styles from '../../css/student/forgot-password.module.css';


const RegisterConfirmation: NextPage = () => (
  <div className={styles.container}>
    <div className={styles.background}>
      <ConfirmationPopup url="/tutor/login" />
    </div>
  </div>
);


export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['tutor-confirmation',  'tutor-profile']))
    }
  };
}
export default RegisterConfirmation;
