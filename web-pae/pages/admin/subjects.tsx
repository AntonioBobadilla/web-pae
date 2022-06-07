import SubjectForm from '@/components/subject-form';
import cx from 'classnames';
import Tabs from '@/components/tabs';
import React, { ReactElement, useEffect, useState } from 'react';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import styles from '../../css/admin/subjects.module.css';
import DeleteAdmin from '@/components/dialogs/delete-subject';

const Subject = () => {
  const [currentTab, setCurrentTab] = useState('');
  const [popUp, setPopUp] = useState(false);
  const [id, setId] = useState(null);
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);

  const UFButton = () => {
    setCurrentTab('UF');
    location.reload();
  };

  const AddUFButton = () => {
    setCurrentTab('addUF');
  };
  const visiblePopUp = () => {
    setPopUp(true);
  };
  const checkItemState = (idItem) => {
    setId(idItem);
    visiblePopUp();
  };
  useEffect(() => {
    setCurrentTab('UF');
  }, []);

  const getData = () => {
    fetch('http://server-pae.azurewebsites.net/subject/')
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

  const deleteSubject = () => {
    console.log(id);
    fetch('http://server-pae.azurewebsites.net/subject/' + id + '/', {
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
      <div className={styles.search}>
        <div className={styles.searchtop}>
          <input
            style={{
              backgroundColor: '#F1F1F1'
            }}
            type="text"
            placeholder="CLAVE*"
            className={styles.inputclave}
          ></input>
          <input
            style={{
              backgroundColor: '#F1F1F1'
            }}
            type="text"
            placeholder="NOMBRE*"
            className={styles.inputnombre}
          ></input>
        </div>
        <div className={styles.searchbottom}>
          <button className={styles.button}>Buscar</button>
        </div>
      </div>
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
        {pending && <div className={styles.loading}>Cargando datos...</div>}
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
                    <i
                      className={cx('bi bi-trash', styles.de)}
                      onClick={() => checkItemState(item.code)}
                    ></i>
                  </div>
                );
              })}
              <DeleteAdmin
                visible={popUp}
                setVisible={setPopUp}
                onClickFunction={() => deleteSubject()}
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
