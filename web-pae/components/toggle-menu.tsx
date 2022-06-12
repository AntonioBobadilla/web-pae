import post from '@/helpers/post';
import { Router, withRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { selectRole, selectToken, setLogoutData } from 'store/reducers/user';
import tStyles from '../css/components/toggleMenu.module.css';
import Exit from './dialogs/exit';

type ToggleMenuProps = {
  router: Router;
  onClickModifyPassword: () => void;
  onClickModifyLanguage: () => void;
  onClickModifySubjects: () => void;
  onClickModifySchedule: () => void;
};

const ToggleMenu = ({
  router,
  onClickModifyPassword,
  onClickModifyLanguage,
  onClickModifySubjects,
  onClickModifySchedule
}: ToggleMenuProps) => {
  const [visible, setVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const role = useAppSelector(selectRole);
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
    setTimeout(() => router.push(`/${role}/login/`), 500);
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
                onClick={() => onClickModifySchedule()}
                tabIndex={-1}
              >
                Modificar horario
              </span>
            </li>
            <li className={tStyles.li}>
              <span
                role="button"
                className={tStyles.a}
                onClick={() => onClickModifySubjects()}
                tabIndex={-1}
              >
                Modificar materias
              </span>
            </li>
            <li className={tStyles.li}>
              <span
                role="button"
                className={tStyles.a}
                onClick={() => onClickModifyPassword()}
                tabIndex={-1}
              >
                Modificar contraseña
              </span>
            </li>
            <li className={tStyles.li}>
              <span
                role="button"
                className={tStyles.a}
                onClick={() => onClickModifyLanguage()}
                tabIndex={-1}
              >
                Modificar idioma
              </span>
            </li>
            <li className={tStyles.li}>
              <span
                role="button"
                className={tStyles.a}
                onClick={() => handleLogOut()}
                tabIndex={-1}
              >
                Cerrar sesión
              </span>
            </li>
          </ul>
          {visible && (
            <Exit
              visible={visible}
              setVisible={setVisible}
              handleExit={() => logOut()}
              handleCancel={() => setVisible(false)}
              isLoading={isLoading}
            />
          )}
        </nav>
      </div>
    </div>
  );
};

export default withRouter(ToggleMenu);
