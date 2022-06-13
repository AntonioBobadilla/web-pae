import AdminForm from '@/components/admin-form';
import DeleteAdmin from '@/components/dialogs/delete-admin';
import Tabs from '@/components/tabs';
import { selectToken } from '@/redux/user';
import cx from 'classnames';
import React, { ReactElement, useEffect, useState } from 'react';
import { useAppSelector } from 'store/hook';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import styles from '../../css/admin/admins.module.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Subject = () => {
  const [currentTab, setCurrentTab] = useState('');
  const [popUp, setPopUp] = useState(false);
  const [id, setId] = useState(null);
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);
  const { t } = useTranslation('admin-admins');
  const token = useAppSelector(selectToken);

  const AdminButton = () => {
    setCurrentTab('admins');
    getData();
  };
  const visiblePopUp = () => {
    setPopUp(true);
  };

  const checkItemState = (idItem: React.SetStateAction<null>) => {
    setId(idItem);
    visiblePopUp();
  };

  const AddAdminButton = () => {
    setCurrentTab('addAdmins');
  };
  useEffect(() => {
    setCurrentTab('admins');
  }, []);

  const getData = () => {
    fetch('https://server-pae.azurewebsites.net/administrator/', {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`
      }
    })
      .then((resp) => resp.json())
      .then(function (data) {
        //console.log(data)
        setData(data);
        setPending(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const notVisiblePopUp = () => {
    setPopUp(false);
  };

  const deleteAdmin = () => {
    console.log(id);
    fetch('https://server-pae.azurewebsites.net/administrator/' + id + '/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error('could not make POST request for that endpoint');
        } else if (res.status == 204) {
          notVisiblePopUp();
          getData();
        }
        return res.json();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className={styles.main}>
      <div className={styles.tabs}>
        <div className={styles.UfTab}>
          <Tabs
            handleClick={AdminButton}
            text={t('Administrators')}
            active={currentTab == 'admins' ? true : false}
          />
        </div>
        <div className={styles.addTab}>
          <Tabs
            handleClick={AddAdminButton}
            text={t('Add administrator')}
            active={currentTab == 'addAdmins' ? true : false}
          />
        </div>
      </div>

      <div className={styles.ufContainer}>
        {pending && <div className={styles.loading}>{t('Loading data')}</div>}
        <div
          className={
            currentTab == 'addAdmins' ? styles.addSubject : styles.hidden
          }
        >
          <div className={styles.top}>
            <span className={styles.description}>{t('Please fill')}</span>
          </div>
          <div className={styles.bottom}>
            <AdminForm />
          </div>
        </div>
        <div
          className={currentTab == 'admins' ? styles.subjects : styles.hidden}
        >
          <div className={styles.down}>
            <div className={styles.tableRequest}>
              <div className={styles.headRow}>
                <span className={styles.clave}>{t('Registration number')}</span>
                <span className={styles.name}>{t('Name')}</span>
                <span className={styles.email}>{t('Mail')}</span>
                <span className={styles.delete}>{t('Delete')}</span>
              </div>
              {data.map(function (item: any, index) {
                let adminId =
                  item.registration_number != null
                    ? item.registration_number
                    : t('No registration');
                let adminName = item.name != null ? item.name : t('No name');
                let adminEmail = () => {
                  if (item.email == null) {
                    return t('No mail');
                  }
                  return item.email;
                };

                return (
                  <div className={styles.body}>
                    <span className={styles.clave}>{adminId}</span>
                    <span className={styles.name}>{adminName}</span>
                    <span className={styles.email}>{adminEmail()}</span>
                    <i
                      className={cx('bi bi-trash', styles.de)}
                      onClick={() => checkItemState(item.registration_number)}
                    />
                  </div>
                );
              })}
              <DeleteAdmin
                visible={popUp}
                setVisible={setPopUp}
                onClickFunction={() => deleteAdmin()}
                onClickCancel={notVisiblePopUp}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add sidebar layout
Subject.getLayout = function getLayout(page: ReactElement) {
  const { t } = useTranslation('admin-admins');
  return <SidebarLayout title={t('Manage subjects')}>{page}</SidebarLayout>;
};

export async function getStaticProps({ locale }) {
  //traductor pagina principal
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'admin-admins',
        'tutor-profile'
      ]))
    }
  };
}

export default Subject;
