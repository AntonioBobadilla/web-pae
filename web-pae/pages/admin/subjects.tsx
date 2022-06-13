import DeleteAdmin from '@/components/dialogs/delete-subject';
import { Subject } from '@/components/search-bar';
import SubjectForm from '@/components/subject-form';
import Tabs from '@/components/tabs';
import { selectToken } from '@/redux/user';
import cx from 'classnames';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
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
  const { t } = useTranslation('admin-subjects');
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
            const subjectId =
              item.code != null ? item.code : t('There is no code');
            const subjectName =
              item.name != null ? item.name : t('There is no name');
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
            {t('There is no subject with such code')}
          </span>
        );
      }
      return (
        <>
          {filteredArray.map((item, index) => {
            const subjectId =
              item.code != null ? item.code : t('There is no code');
            const subjectName =
              item.name != null ? item.name : t('There is no name');
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
            {t('There is no subject with such name')}
          </span>
        );
      }
      return (
        <>
          {filteredArrayName.map((item, index) => {
            const subjectId =
              item.code != null ? item.code : t('There is no code');
            const subjectName =
              item.name != null ? item.name : t('There is no name');
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
        {t('It is impossible to do this search')}
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
          window.location.reload();
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
            <strong>Search</strong>
          </span>{' '}
          <div className={styles.searchtop}>
            {editable && editableName ? (
              <>
                <input
                  style={{
                    backgroundColor: '#F1F1F1'
                  }}
                  type="text"
                  placeholder={t('CODE*')}
                  className={styles.inputID}
                  onChange={handleChangeClave}
                  readOnly={!editable}
                />
                <input
                  style={{
                    backgroundColor: '#F1F1F1'
                  }}
                  type="text"
                  placeholder={t('NAME*')}
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
                  placeholder={t('CODE*')}
                  className={styles.inputID}
                  onChange={handleChangeClave}
                  readOnly={!editable}
                />
                <input
                  style={{
                    backgroundColor: '#B9B6B6'
                  }}
                  type="text"
                  placeholder={t('IT IS NOT POSSIBLE TO WRITE IN THIS FIELD')}
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
                  placeholder={t('IT IS NOT POSSIBLE TO WRITE IN THIS FIELD')}
                  className={styles.inputID}
                  onChange={handleChangeClave}
                  readOnly={!editable}
                />
                <input
                  style={{
                    backgroundColor: '#F1F1F1'
                  }}
                  type="text"
                  placeholder={t('NAME*')}
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
            text={t('Subjects')}
            active={currentTab == 'UF'}
          />
        </div>
        <div className={styles.addTab}>
          <Tabs
            handleClick={AddUFButton}
            text={t('Add subject')}
            active={currentTab == 'addUF'}
          />
        </div>
      </div>
      <div className={styles.ufContainer}>
        {pending && <div className={styles.loading}>{t('Loading data')}</div>}
        <div
          className={currentTab == 'addUF' ? styles.addSubject : styles.hidden}
        >
          <SubjectForm />
        </div>
        <div className={currentTab == 'UF' ? styles.subjects : styles.hidden}>
          <div className={styles.down}>
            <div className={styles.tableRequest}>
              <div className={styles.headRow}>
                <span className={styles.clave}>{t('Code')}</span>
                <span className={styles.name}>{t('Name')}</span>
                <span className={styles.delete}>{t('Delete')}</span>
              </div>
              <div className={styles.quickfix}>
                <div className={styles.bodyContainer}>
                  {conditionalRendering()}
                </div>
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
  const { t } = useTranslation('admin-subjects');
  return <SidebarLayout title={t('Manage subjects')}>{page}</SidebarLayout>;
};

export async function getStaticProps({ locale }: { locale: any }) {
  //traductor pagina principal
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'admin-subjects',
        'tutor-profile'
      ]))
    }
  };
}

export default Subjects;
