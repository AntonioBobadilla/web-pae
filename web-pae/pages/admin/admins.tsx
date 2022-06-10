import AdminForm from '@/components/admin-form';
import Tabs from '@/components/tabs';
import React, { ReactElement, useEffect, useState } from 'react';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import styles from '../../css/admin/admins.module.css';
import cx from 'classnames';
import DeleteAdmin from '@/components/dialogs/delete-admin';

const Subject = () => {
  const [currentTab, setCurrentTab] = useState('');
  const [popUp, setPopUp] = useState(false);
  const [id, setId] = useState(null);
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);

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
    fetch('http://server-pae.azurewebsites.net/administrator/')
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

  const deleteQuestion = () => {
    console.log(id);
    fetch('http://server-pae.azurewebsites.net/administrator/' + id + '/', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
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
            text="Administradores"
            active={currentTab == 'admins' ? true : false}
          ></Tabs>
        </div>
        <div className={styles.addTab}>
          <Tabs
            handleClick={AddAdminButton}
            text="Agregar Administrador"
            active={currentTab == 'addAdmins' ? true : false}
          ></Tabs>
        </div>
      </div>

      <div className={styles.ufContainer}>
        {pending && <div className={styles.loading}>Cargando datos...</div>}
        <div
          className={
            currentTab == 'addAdmins' ? styles.addSubject : styles.hidden
          }
        >
          <div className={styles.top}>
            <span className={styles.description}>
              Favor de llenar el formulario con los datos correspondientes
            </span>
          </div>
          <div className={styles.bottom}>
            <AdminForm></AdminForm>
          </div>
        </div>
        <div
          className={currentTab == 'admins' ? styles.subjects : styles.hidden}
        >
          <div className={styles.down}>
            <div className={styles.tableRequest}>
              <div className={styles.headRow}>
                <span className={styles.clave}>Matrícula/Nómina</span>
                <span className={styles.name}>Nombre</span>
                <span className={styles.email}>Correo electrónico</span>
                <span className={styles.delete}>Eliminar</span>
              </div>
              {data.map(function (item: any, index) {
                let adminId =
                  item.registration_number != null
                    ? item.registration_number
                    : 'no hay clave';
                let adminName = item.name != null ? item.name : 'no hay nombre';
                let adminEmail = () => {
                  if (item.email == null) {
                    return 'no hay correo';
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
                    ></i>
                  </div>
                );
              })}
              <DeleteAdmin
                visible={popUp}
                setVisible={setPopUp}
                onClickFunction={() => deleteQuestion()}
                onClickCancel={notVisiblePopUp}
              ></DeleteAdmin>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add sidebar layout
Subject.getLayout = function getLayout(page: ReactElement) {
  return (
    <SidebarLayout title="ADMINISTRAR UNIDADES DE FORMACIÓN">
      {page}
    </SidebarLayout>
  );
};

export default Subject;
