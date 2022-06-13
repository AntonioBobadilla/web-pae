/* eslint-disable @next/next/no-img-element */
import post from '@/helpers/post';
import { Router, withRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { selectToken, setLogoutData } from 'store/reducers/user';
import tStyles from '../css/components/toggleMenuStudent.module.css';
import Exit from './dialogs/exit';
import { useTranslation } from 'next-i18next';  // add this

type ToggleMenuStudentProps = {
  onClickModifyPassword: () => void;
  onClickModifyLanguage: () => void;

  router: Router;
};

const ToggleMenuStudent = ({
  onClickModifyPassword,
  onClickModifyLanguage,
  router
}: ToggleMenuStudentProps) => {
  const { t } = useTranslation('student-profile'); // add this
  const [visible, setVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);

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
  const handleStatus = (status: number, responseData: any) => {
    try {
      if (status === 200 || status === 201 || status === 204) {
        // toast success
        toast.success('Successful logoout');

        // set user data

        dispatch(setLogoutData());

        // redirect to home
        setTimeout(() => router.push('/student/login/'), 500);
      } else {
        toast.error(responseData.message);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error('Something went wrong');
      setIsLoading(false);
    }
  };
  const handleLogOut = () => {
    setVisible(true);
  };
  return (
    <div className={tStyles.main}>
      <input type="checkbox" className={tStyles.toggler} />
      <div className={tStyles.buttonContainer} id="toggle">
        <img className={tStyles.icon} src="/icons/gear.svg" />
      </div>
      <div className={tStyles.overlay} id="overlay">
        <nav className={tStyles.overlayMenu}>
          <ul className={tStyles.ul}>
            <li className={tStyles.li}>
              <span
                role="button"
                className={tStyles.a}
                onClick={() => onClickModifyPassword()}
                tabIndex={-1}
              >
                {t('Modificar contraseña')}
              </span>
            </li>
            <li className={tStyles.li}>
              <span
                role="button"
                className={tStyles.a}
                onClick={() => onClickModifyLanguage()}
                tabIndex={-1}
              >
                {t('Modificar idioma')}
              </span>
            </li>
            <li className={tStyles.li}>
              <span
                role="button"
                className={tStyles.a}
                onClick={() => handleLogOut()}
                tabIndex={-1}
              >
                {t('Cerrar sesión')}
              </span>
            </li>
          </ul>
        </nav>
        {visible && (
          <Exit
            visible={visible}
            setVisible={setVisible}
            handleExit={() => logOut()}
            handleCancel={() => setVisible(false)}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default withRouter(ToggleMenuStudent);
