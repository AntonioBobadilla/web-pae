import SubjectForm from '@/components/subject-form';
import Tabs from '@/components/tabs';
import React, { ReactElement, useEffect, useState } from 'react';
import ImageCard from '../../components/image-card';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import styles from '../../css/admin/subjects.module.css';

const Subject = () => {
  const [currentTab, setCurrentTab] = useState('');

  const UFButton = () => {
    setCurrentTab('UF');
  };

  const AddUFButton = () => {
    setCurrentTab('addUF');
  };
  useEffect(() => {
    setCurrentTab('UF');
  }, []);
  const [data, setData] = useState([]);

  const getData = () => {
    fetch('http://server-pae.azurewebsites.net/subject/')
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
      <div className={styles.search}>AAA</div>
      <div className={styles.tabs}>
        <div className={styles.UfTab}>
          <Tabs
            handleClick={UFButton}
            text="Unidades de Formación"
            active={currentTab == 'UF' ? true : false}
          ></Tabs>
        </div>
        <div className={styles.addTab}>
          <Tabs
            handleClick={AddUFButton}
            text="Agregar Unidad de Formación"
            active={currentTab == 'addUF' ? true : false}
          ></Tabs>
        </div>
      </div>

      <div className={styles.ufContainer}>
        <div
          className={currentTab == 'addUF' ? styles.addSubject : styles.hidden}
        >
          <SubjectForm></SubjectForm>
        </div>
        <div className={currentTab == 'UF' ? styles.subjects : styles.hidden}>
          <div className={styles.down}>
            <div className={styles.tableRequest}>
              <div className={styles.headRow}>
                <span className={styles.clave}>Clave</span>
                <span className={styles.name}>Nombre</span>
                <span className={styles.edit}>Editar</span>
                <span className={styles.delete}>Eliminar</span>
              </div>
              {data.map(function (item, index) {
                let subjectId = item.code != null ? item.code : 'no hay clave';
                let subjectName =
                  item.name != null ? item.name : 'no hay nombre';

                return (
                  <div className={styles.body}>
                    <span className={styles.clave}>{subjectId}</span>
                    <span className={styles.name}>{subjectName}</span>
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
