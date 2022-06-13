import DeleteAdmin from '@/components/dialogs/delete-subject';
import { Subject } from '@/components/search-bar';
import SubjectForm from '@/components/subject-form';
import Tabs from '@/components/tabs';
import { selectToken } from '@/redux/user';
import cx from 'classnames';
import React, { ReactElement, useEffect, useState } from 'react';
import { useAppSelector } from 'store/hook';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import styles from '../../css/admin/subjects.module.css';

const Subjects = () => {
  const [currentTab, setCurrentTab] = useState('');
  const [popUp, setPopUp] = useState(false);
  const [id, setId] = useState(null);
  const [data, setData] = useState<Subject[]>([]);
  const [pending, setPending] = useState(true);
  const [clave, setClave] = useState('');
  const [nombre, setNombre] = useState('');
  const [typing, setTyping] = useState(false);
  const [typingName, setTypingName] = useState(false);
  const [filteredArray, setFilteredArray] = useState<Subject[]>([]);
  const [filteredArrayName, setFilteredArrayName] = useState<Subject[]>([]);
  const [editable, setEditable] = useState(true);
  const [editableName, setEditableName] = useState(true);
  const token = useAppSelector(selectToken);

  const UFButton = () => {
    setCurrentTab('UF');
    getData();
  };
  const AddUFButton = () => {
    setCurrentTab('addUF');
  };
  const visiblePopUp = () => {
    setPopUp(true);
  };
  const checkItemState = (idItem: React.SetStateAction<any>) => {
    setId(idItem);
    visiblePopUp();
  };
  useEffect(() => {
    setCurrentTab('UF');
  }, []);
  const getData = () => {
    fetch('https://server-pae.azurewebsites.net/subject/', {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`
      }
    })
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data)
        setData(data);
        setPending(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const notVisiblePopUp = () => {
    setPopUp(false);
  };
  const conditionalRendering = () => {
    if (!typing && !typingName) {
      return (
        <>
          {data.map((item, index) => {
            const subjectId = item.code != null ? item.code : 'no hay clave';
            const subjectName = item.name != null ? item.name : 'no hay nombre';
            return (
              <div key={index} className={styles.body}>
                <span className={styles.clave}>{subjectId}</span>
                <span className={styles.name}>{subjectName}</span>
                <i
                  className={cx('bi bi-trash', styles.de)}
                  onClick={() => checkItemState(item.code)}
                />
              </div>
            );
          })}
        </>
      );
    }
    if (typing && !typingName) {
      if (filteredArray.length === 0) {
        return (
          <span className={styles.error}>
            *Lo sentimos, no existe una unidad de formación con esta clave.*
          </span>
        );
      }
      return (
        <>
          {filteredArray.map((item, index) => {
            const subjectId = item.code != null ? item.code : 'no hay clave';
            const subjectName = item.name != null ? item.name : 'no hay nombre';
            return (
              <div key={index} className={styles.body}>
                <span className={styles.clave}>{subjectId}</span>
                <span className={styles.name}>{subjectName}</span>
                <i
                  className={cx('bi bi-trash', styles.de)}
                  onClick={() => checkItemState(item.code)}
                />
              </div>
            );
          })}
        </>
      );
    }
    if (typingName && !typing) {
      if (filteredArrayName.length === 0) {
        return (
          <span className={styles.error}>
            *Lo sentimos, no existe una unidad de formación con este nombre.*
          </span>
        );
      }
      return (
        <>
          {filteredArrayName.map((item, index) => {
            const subjectId = item.code != null ? item.code : 'no hay clave';
            const subjectName = item.name != null ? item.name : 'no hay nombre';
            return (
              <div key={index} className={styles.body}>
                <span className={styles.clave}>{subjectId}</span>
                <span className={styles.name}>{subjectName}</span>
                <i
                  className={cx('bi bi-trash', styles.de)}
                  onClick={() => checkItemState(item.code)}
                />
              </div>
            );
          })}
        </>
      );
    }
    return (
      <span className={styles.error}>
        *No es posible realizar esta búsqueda, por favor intenta buscar la
        Unidad de Formación solo por clave o solo por nombre*
      </span>
    );
  };

  const handleChangeClave = (e: any) => {
    setClave(e.target.value);
    filterClave(e.target.value);
    if (e.target.value != '') {
      setTyping(true);
      setEditableName(false);
    } else {
      setTyping(false);
      setEditableName(true);
    }
    conditionalRendering();
  };
  const handleChangeNombre = (e: {
    target: { value: React.SetStateAction<any> };
  }) => {
    setNombre(e.target.value);
    filterNombre(e.target.value);
    if (e.target.value != '') {
      setTypingName(true);
      setEditable(false);
    } else {
      setTypingName(false);
      setEditable(true);
    }
    conditionalRendering();
  };
  const filterClave = (clave: string) => {
    const subjectsCopy = [...data];
    console.log(subjectsCopy);
    const filteredArray = subjectsCopy.filter((subject) =>
      subject.code.includes(clave.toUpperCase())
    );
    setFilteredArray(filteredArray);
  };
  const filterNombre = (nombre: string) => {
    const subjectsCopy = [...data];
    console.log(subjectsCopy);
    const filteredArrayName = subjectsCopy.filter((subject) =>
      subject.name.includes(nombre.toUpperCase())
    );
    setFilteredArrayName(filteredArrayName);
  };

  const deleteSubject = () => {
    console.log(id);
    fetch(`https://server-pae.azurewebsites.net/subject/${id}/`, {
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
      <div className={currentTab == 'UF' ? styles.search : styles.hidden}>
        <div className={styles.searchBar}>
          <span className={styles.loading}>
            {' '}
            <strong>Buscar</strong>
          </span>{' '}
          <div className={styles.searchtop}>
            {editable && editableName ? (
              <>
                <input
                  style={{
                    backgroundColor: '#F1F1F1'
                  }}
                  type="text"
                  placeholder="CLAVE*"
                  className={styles.inputID}
                  onChange={handleChangeClave}
                  readOnly={!editable}
                />
                <input
                  style={{
                    backgroundColor: '#F1F1F1'
                  }}
                  type="text"
                  placeholder="NOMBRE*"
                  className={styles.inputName}
                  onChange={handleChangeNombre}
                  readOnly={!editableName}
                />
              </>
            ) : !editableName ? (
              <>
                <input
                  style={{
                    backgroundColor: '#F1F1F1'
                  }}
                  type="text"
                  placeholder="CLAVE*"
                  className={styles.inputID}
                  onChange={handleChangeClave}
                  readOnly={!editable}
                />
                <input
                  style={{
                    backgroundColor: '#B9B6B6'
                  }}
                  type="text"
                  placeholder="NO ES POSIBLE ESCRIBIR EN ESTE CAMPO"
                  className={styles.inputName}
                  onChange={handleChangeNombre}
                  readOnly={!editableName}
                />
              </>
            ) : (
              <>
                <input
                  style={{
                    backgroundColor: '#B9B6B6'
                  }}
                  type="text"
                  placeholder="NO ES POSIBLE ESCRIBIR EN ESTE CAMPO"
                  className={styles.inputID}
                  onChange={handleChangeClave}
                  readOnly={!editable}
                />
                <input
                  style={{
                    backgroundColor: '#F1F1F1'
                  }}
                  type="text"
                  placeholder="NOMBRE*"
                  className={styles.inputName}
                  onChange={handleChangeNombre}
                  readOnly={!editableName}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles.tabs}>
        <div className={styles.UfTab}>
          <Tabs
            handleClick={UFButton}
            text="Unidades de Formación"
            active={currentTab == 'UF'}
          />
        </div>
        <div className={styles.addTab}>
          <Tabs
            handleClick={AddUFButton}
            text="Agregar Unidad de Formación"
            active={currentTab == 'addUF'}
          />
        </div>
      </div>
      <div className={styles.ufContainer}>
        {pending && <div className={styles.loading}>Cargando datos...</div>}
        <div
          className={currentTab == 'addUF' ? styles.addSubject : styles.hidden}
        >
          <SubjectForm />
        </div>
        <div className={currentTab == 'UF' ? styles.subjects : styles.hidden}>
          <div className={styles.down}>
            <div className={styles.tableRequest}>
              <div className={styles.headRow}>
                <span className={styles.clave}>Clave</span>
                <span className={styles.name}>Nombre</span>
                <span className={styles.delete}>Eliminar</span>
              </div>
              <div className={styles.bodyContainer}>
                {conditionalRendering()}
              </div>

              <DeleteAdmin
                visible={popUp}
                setVisible={setPopUp}
                onClickFunction={() => deleteSubject()}
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
Subjects.getLayout = function getLayout(page: ReactElement) {
  return (
    <SidebarLayout title="ADMINISTRAR UNIDADES DE FORMACIÓN">
      {page}
    </SidebarLayout>
  );
};
export default Subjects;
