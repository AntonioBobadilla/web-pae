import { reset } from '@/redux/schedule-tutoring';
import post from 'helpers/post';
import Head from 'next/head';
import { Router, withRouter } from 'next/router';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { selectRole, selectToken, setLogoutData } from 'store/reducers/user';
import ADMIN_ROUTES from '../../constants/admin-routes.json';
import STUDENT_ROUTES from '../../constants/student-routes.json';
import TUTOR_ROUTES from '../../constants/tutor-routes.json';
import styles from '../../css/components/layouts/sidebarLayout.module.css';
import Exit from '../dialogs/exit';
import withAuthentication from '../navigation/with-authentication';
import SideBar from '../sidebar';
import { useTranslation } from 'next-i18next'; 

type LayoutProps = {
  router: Router;
  children: React.ReactNode;
  title: string;
};

const SidebarLayout = ({ router, children, title }: LayoutProps) => {
  const { pathname, push, route } = router;
  const [routes, setRoutes] = React.useState(TUTOR_ROUTES);
  const [visible, setVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const role = useAppSelector(selectRole);
  const { t } = useTranslation('tutor-profile');

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

  React.useEffect(() => {
    if (!route.includes('schedule-tutoring')) {
      dispatch(reset());
    }
  }, [route]);

  const handleStatus = (status: number, responseData: any) => {
    try {
      if (status === 200 || status === 201 || status === 204) {
        // toast success
        toast.success('Successful logout');
      } else {
        // set user data

        toast.error(responseData.token);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error('Something went wrong');
      setIsLoading(false);
    }
    // set user data

    dispatch(setLogoutData());

    // redirect to home
    setTimeout(() => push(routes.exit), 500);
  };

  const logOut = () => {
    // console.log(role);
    setIsLoading(true);
    post({ token }, 'https://server-pae.azurewebsites.net/logout/')
      .then(({ status, responseData }) => {
        handleStatus(status, responseData);
      })
      .catch((err) => {
        handleStatus(500, err);
      });
  };

  const handleLogOut = () => {
    setVisible(true);
  };

  return (
    <>
      <Head>
        <title>PAE | {t('Tutor-Student')}</title>
        <meta name="description" content="Generated by Hacket" />
        <link rel="icon" href="/images/icon.ico" />
      </Head>
      <Toaster position="top-right" reverseOrder={false} />
      <main className={styles.main}>
        <div className={styles.sidebar}>
          <SideBar
            routing={routes}
            currentRoute={pathname}
            logOut={handleLogOut}
          />
        </div>
        <div className={styles.test}>
          <div className={styles.top}>
            <h1 className="title">{title}</h1>
          </div>
          {children}
        </div>
        {visible && (
          <Exit
            visible={visible}
            setVisible={setVisible}
            handleExit={() => logOut()}
            handleCancel={() => setVisible(false)}
            isLoading={isLoading}
          />
        )}
      </main>
    </>
  );
};

// ACTIVATE THIS CODE FOR AUTHENTICATION
export default withAuthentication(withRouter(SidebarLayout));
// export default withRouter(SidebarLayout);
