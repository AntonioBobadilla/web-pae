import { selectRole, setLogoutData } from '@/redux/user';
import Head from 'next/head';
import { Router, withRouter } from 'next/router';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'store/hook';
import ADMIN_ROUTES from '../../constants/admin-routes.json';
import STUDENT_ROUTES from '../../constants/student-routes.json';
import TUTOR_ROUTES from '../../constants/tutor-routes.json';
import styles from '../../css/components/layouts/sidebarLayout.module.css';
import withAuthentication from '../navigation/with-authentication';
import SideBar from '../sidebar';

type LayoutProps = {
  router: Router;
  children: React.ReactNode;
  title: string;
};

const SidebarLayout = ({ router, children, title }: LayoutProps) => {
  const { pathname, push } = router;
  const [routes, setRoutes] = React.useState(TUTOR_ROUTES);
  const dispatch = useAppDispatch();
  // const token = useAppSelector(selectToken);
  const role = useAppSelector(selectRole);

  React.useEffect(() => {
    switch (role) {
      case 'admin':
        setRoutes(ADMIN_ROUTES);
        break;
      case 'student':
        setRoutes(STUDENT_ROUTES);
        break;
      case 'tutor':
        setRoutes(TUTOR_ROUTES);
        break;
      default:
        setRoutes(TUTOR_ROUTES);
        break;
    }
  }, [role]);

  const logOut = () => {
    // console.log(role);
    dispatch(setLogoutData());
    push(routes.exit);
  };

  return (
    <>
      <Head>
        <title>PAE | Plataforma Asesor-Estudiante</title>
        <meta name="description" content="Generated by Hacket" />
        <link rel="icon" href="/images/icon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.sidebar}>
          <SideBar routing={routes} currentRoute={pathname} logOut={logOut} />
        </div>
        <div className={styles.test}>
          <div className={styles.top}>
            <h1 className="title">{title}</h1>
          </div>
          {children}
        </div>
      </main>
    </>
  );
};

export default withAuthentication(withRouter(SidebarLayout));
