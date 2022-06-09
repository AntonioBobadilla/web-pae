import stylesSubjects from '@/css-tutor/modify-subjects.module.css';
import React, { useEffect, useState } from 'react';
import styles from '../../css/components/dialogs/modify-password.module.css';
import registerStyles from '../../css/register.module.css';
import ButtonTemplate from '../button-template';
import ClosablePopup from '../closable-popup';
import SearchBar from '../search-bar';

type ModifyLanguageProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void,
  id: any;
};

const ModifySubjects = ({ visible, setVisible, id }: ModifyLanguageProps) => {
  const onClickSave = () => {
    setVisible(false);
  };

  const [subjectsFromApi, setSubjectsFromApi] = useState([]);
  const [subjectsFromTutor, setSubjectsFromTutor] = useState([]);

  const getAllSubjects = () => {
    fetch('http://server-pae.azurewebsites.net/subject/')
    .then((resp) => resp.json())
    .then((data) => {
      setSubjectsFromApi(data);
    });
  }

  const getAllSubjectsFromTutor = () => {
    fetch('http://server-pae.azurewebsites.net/subjectbytutor/'+id.toLowerCase())
    .then((resp) => resp.json())
    .then((data) => {
      setSubjectsFromTutor(data);
      console.log(data)
    });
  }

  const showSuccessModal = () => {
    let modal = document.querySelector('#message');
    setTimeout(() => {
      modal.style.display = "block";
      setTimeout(() => {
        modal.style.display = "none";
      },3000)
    },3000)
  }

  useEffect(() => {
    getAllSubjects()
    getAllSubjectsFromTutor()
  }, []);

  const insertSubjectOnTutor = (subject) => {
    fetch('http://server-pae.azurewebsites.net/subjectbytutor/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({"tutor": id.toLowerCase(), "subject":subject})
  })
    .then(res => {
      if (!res.ok) { // error coming back from server
        throw Error('could not make POST request on subject on tutor');
      } 
      return res.json();
    })
    .then(data => {
      console.log('ok')
      showSuccessModal();
      //onClickSuccessAcceptTutee()
      //window.location.reload(false);
    })
    .catch(err => {
        console.log(err.message);
    }) 
  }

  const handleSubject = (subject) => {
    insertSubjectOnTutor(subject.code)
    setSubjectsFromTutor((subjectsFromTutor) => [...subjectsFromTutor, subject]);
  };

  const deleteSubjectFromTutor = (code) => {
    fetch('http://server-pae.azurewebsites.net/subjectbytutor/', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          tutor:   id.toLowerCase(),
          subject: code
        }
      )
  })
    .then(res => {
      if (!res.ok) { // error coming back from server
        throw Error('could not make DELETE request on subject on tutor');
      } 
      return res.json();
    })
    .then(data => {
      console.log('ok MATERIA BORRADA PERRO')
      showSuccessModal();
      //onClickSuccessAcceptTutee()
      //window.location.reload(false);
    })
    .catch(err => {
        console.log(err.message);
    })     
  }

  const handleDelete = (subjectCode) => {
    const arr = subjectsFromTutor.filter((item) => item.code.toUpperCase() !== subjectCode);
    setSubjectsFromTutor((subjectsFromTutor) => arr);
    deleteSubjectFromTutor(subjectCode);
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
        style={{ 'flexDirection': 'column' }}
      >
        <div id='message' className={stylesSubjects.successMessage}>
          <p>Materia agregada con éxito.</p>
        </div>
        <div className={stylesSubjects.wrapperSearchBar}>
          <SearchBar handleSuggestions={handleSubject} suggestions={subjectsFromApi} />
        </div>

        <div className={stylesSubjects.wrapper}>
          {subjectsFromTutor.map((materia, index) => (
            <div key={index} className={stylesSubjects.subjectsWrapper}>
              <li className={stylesSubjects.materia}>
                {materia.code}{' '} {materia.name}
                <button onClick={ () => handleDelete(materia.code) } className={stylesSubjects.icon}>
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
