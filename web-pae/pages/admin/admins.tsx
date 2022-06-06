import SubjectForm from '@/components/subject-form';
import Tabs from '@/components/tabs';
import React, { ReactElement, useEffect, useState } from 'react';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import styles from '../../css/admin/admins.module.css';

const Subject = () => {
  const [currentTab, setCurrentTab] = useState('');

  const AdminButton = () => {
    setCurrentTab('admins');
  };

  const AddAdminButton = () => {
    setCurrentTab('addAdmins');
  };
  useEffect(() => {
    setCurrentTab('admins');
  }, []);
  const [data, setData] = useState([]);

  const getData = () => {
    fetch('http://server-pae.azurewebsites.net/tutor/')
      .then((resp) => resp.json())
      .then(function (data) {
        //console.log(data)
        setData(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.tabs}>
        <div className={styles.UfTab}>
          <Tabs
            handleClick={AdminButton}
            text="Unidades de Formación"
            active={currentTab == 'admins' ? true : false}
          ></Tabs>
        </div>
        <div className={styles.addTab}>
          <Tabs
            handleClick={AddAdminButton}
            text="Agregar Unidad de Formación"
            active={currentTab == 'addAdmins' ? true : false}
          ></Tabs>
        </div>
      </div>

      <div className={styles.ufContainer}>
        <div
          className={
            currentTab == 'addAdmins' ? styles.addSubject : styles.hidden
          }
        >
          <SubjectForm></SubjectForm>
        </div>
        <div
          className={currentTab == 'admins' ? styles.subjects : styles.hidden}
        >
          <div className={styles.down}>
            <div className={styles.tableRequest}>
              <div className={styles.headRow}>
                <span className={styles.clave}>
                  Matrícula/ <br />
                  Nómina
                </span>
                <span className={styles.name}>Nombre</span>
                <span className={styles.email}>Correo electrónico</span>
                <span className={styles.type}>Tipo de Admin</span>
                <span className={styles.edit}>Editar</span>
                <span className={styles.delete}>Eliminar</span>
              </div>
              {data.map(function (item, index) {
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
                let adminUser = () => {
                  if (item.user == null) {
                    return 'no hay usuario';
                  } else {
                    if (item.user.is_staff == true) {
                      return 'Staff';
                    } else if (item.user.is_tutor == true) {
                      return 'Tutor';
                    } else if (item.user.is_admin == true) {
                      return 'Admin';
                    }
                  }
                };

                return (
                  <div className={styles.body}>
                    <span className={styles.clave}>{adminId}</span>
                    <span className={styles.name}>{adminName}</span>
                    <span className={styles.email}>{adminEmail()}</span>
                    <span className={styles.type}>{adminUser()}</span>
                    <span className={styles.edit}>Hola</span>
                    <span className={styles.delete}>Hola</span>
                  </div>
                );
              })}
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
