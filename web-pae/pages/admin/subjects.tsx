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

  return (
    <div className={styles.main}>
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
          <p>Hola Mundo</p>
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
