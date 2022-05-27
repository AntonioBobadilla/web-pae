import React, { useEffect, useState } from 'react';
import styles from '../../css/components/dialogs/modify-password.module.css';
import stylesSubjects from '@/css-tutor/modify-subjects.module.css'
import registerStyles from '../../css/register.module.css';
import ButtonTemplate from '../button-template';
import ClosablePopup from '../closable-popup';
import ToggleButton from '../toggle-button';
import SearchBar from '../search-bar';
import cx from 'classnames';

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
      .then(function(data) {
        setSubjectsFromApi(data)
        })
  }, [])

  const handleSubject = (subject) => {
    setSubjects(subjects => [...subjects, subject]);
  }

  const handleDelete = (e) => {
    let subject = e.target.parentElement.parentElement.innerText;
    console.log(subject)
    let arr = subjects.filter(item => item.toUpperCase() !== subject);
    setSubjects(subjects => arr);
    console.log(arr)
  };

  return (
    <ClosablePopup
      title="Modificar materias"
      line
      visible={visible}
      style={styles.container}
      setVisible={setVisible}
    >
      <div className={registerStyles.languageOptions} style={{'flex-direction':'column'}}>
          <div className={stylesSubjects.wrapperSearchBar}>
            <SearchBar function={handleSubject} suggestions={subjectsFromApi}/>
          </div>

        <div className={stylesSubjects.wrapper}>
            {
                subjects.map(function(materia,index) {
                    return ( 
                        <div className={stylesSubjects.subjectsWrapper}>
                            <li className={stylesSubjects.materia}>{materia} <button onClick={handleDelete} className={stylesSubjects.icon}><i className={"bi bi-trash3"}></i></button></li>
                        </div>

                    )
                })
            }
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
