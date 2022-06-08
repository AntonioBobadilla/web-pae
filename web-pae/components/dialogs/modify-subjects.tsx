import stylesSubjects from '@/css-tutor/modify-subjects.module.css';
import React, { useEffect, useState } from 'react';
import styles from '../../css/components/dialogs/modify-password.module.css';
import registerStyles from '../../css/register.module.css';
import ButtonTemplate from '../button-template';
import ClosablePopup from '../closable-popup';
import SearchBar from '../search-bar';

type ModifyLanguageProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const ModifySubjects = ({ visible, setVisible }: ModifyLanguageProps) => {
  const onClickSave = () => {
    setVisible(false);
  };

  const [subjects, setSubjects] = useState([]);
  const [subjectsFromApi, setSubjectsFromApi] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/subjects')
      .then((resp) => resp.json())
      .then((data) => {
        setSubjectsFromApi(data);
      });
  }, []);

  const handleSubject = (subject) => {
    setSubjects((subjects) => [...subjects, subject]);
  };

  const handleDelete = (e) => {
    const subject = e.target.parentElement.parentElement.innerText;
    console.log(subject);
    const arr = subjects.filter((item) => item.toUpperCase() !== subject);
    setSubjects((subjects) => arr);
    console.log(arr);
  };

  return (
    <ClosablePopup
      title="Modificar materias"
      line
      visible={visible}
      style={styles.container}
      setVisible={setVisible}
    >
      <div
        className={registerStyles.languageOptions}
        style={{ 'flex-direction': 'column' }}
      >
        <div className={stylesSubjects.wrapperSearchBar}>
          <SearchBar function={handleSubject} suggestions={subjectsFromApi} />
        </div>

        <div className={stylesSubjects.wrapper}>
          {subjects.map((materia, index) => (
            <div className={stylesSubjects.subjectsWrapper}>
              <li className={stylesSubjects.materia}>
                {materia}{' '}
                <button onClick={handleDelete} className={stylesSubjects.icon}>
                  <i className="bi bi-trash3" />
                </button>
              </li>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.button}>
        <ButtonTemplate variant="confirm" onClick={() => onClickSave()}>
          GUARDAR
        </ButtonTemplate>
      </div>
    </ClosablePopup>
  );
};

export default ModifySubjects;
