import Head from 'next/head';
import { Router, withRouter } from 'next/router';
import React from 'react';
import ADMIN_ROUTES from '../../constants/admin-routes.json';
import STUDENT_ROUTES from '../../constants/student-routes.json';
import TUTOR_ROUTES from '../../constants/tutor-routes.json';
import styles from '../../css/components/layouts/sidebarLayout.module.css';
import SideBar from '../sidebar';

type LayoutProps = {
  router: Router;
  children: React.ReactNode;
  title: string;
};

const SidebarLayout = ({ router, children, title }: LayoutProps) => {
  const { pathname } = router;
  const [routes, setRoutes] = React.useState(TUTOR_ROUTES);

  React.useEffect(() => {
    if (pathname.includes('admin')) {
      setRoutes(ADMIN_ROUTES);
    } else if (pathname.includes('tutor')) {
      setRoutes(TUTOR_ROUTES);
    } else if (pathname.includes('student')) {
      setRoutes(STUDENT_ROUTES);
    }
  }, [pathname]);

  return (
    <>
      <Head>
        <title>PAE | Plataforma Asesor-Estudiante</title>
        <meta name="description" content="Generated by Hacket" />
        <link rel="icon" href="/images/icon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.sidebar}>
          <SideBar routing={routes} currentRoute={pathname} />
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

export default withRouter(SidebarLayout);
