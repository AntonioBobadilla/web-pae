import stylesSubjects from '@/css-tutor/modify-subjects.module.css';
import { selectToken } from '@/redux/user';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'store/hook';
import styles from '../../css/components/dialogs/modify-password.module.css';
import registerStyles from '../../css/register.module.css';
import ButtonTemplate from '../button-template';
import ClosablePopup from '../closable-popup';
import SearchBar from '../search-bar';

type ModifyLanguageProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  id: any;
};

const ModifySubjects = ({ visible, setVisible, id }: ModifyLanguageProps) => {
  const onClickSave = () => {
    setVisible(false);
  };
  const token = useAppSelector(selectToken);
  const [subjectsFromApi, setSubjectsFromApi] = useState<any>([]);
  const [subjectsFromTutor, setSubjectsFromTutor] = useState<any>([]);

  const getAllSubjects = () => {
    fetch('https://server-pae.azurewebsites.net/subject/')
      .then((resp) => resp.json())
      .then((data) => {
        setSubjectsFromApi(data);
      });
  };

  const getAllSubjectsFromTutor = () => {
    fetch(
      'https://server-pae.azurewebsites.net/subjectbytutor/' + id.toLowerCase(),
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setSubjectsFromTutor(data);
        console.log(data);
      });
  };

  const showSuccessModal = () => {
    let modal: any = document.querySelector('#message');
    setTimeout(() => {
      modal.style.display = 'block';
      setTimeout(() => {
        modal.style.display = 'none';
      }, 3000);
    }, 3000);
  };

  useEffect(() => {
    getAllSubjects();
    getAllSubjectsFromTutor();
  }, []);

  const insertSubjectOnTutor = (subject: any) => {
    fetch('https://server-pae.azurewebsites.net/subjectbytutor/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      },
      body: JSON.stringify({ tutor: id.toLowerCase(), subject: subject })
    })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error('could not make POST request on subject on tutor');
        }
        return res.json();
      })
      .then((data) => {
        console.log('ok');
        showSuccessModal();
        //onClickSuccessAcceptTutee()
        //window.location.reload(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleSubject = (subject: any) => {
    insertSubjectOnTutor(subject.code);
    setSubjectsFromTutor((subjectsFromTutor: any) => [
      ...subjectsFromTutor,
      subject
    ]);
  };

  const deleteSubjectFromTutor = (code: any) => {
    fetch('https://server-pae.azurewebsites.net/subjectbytutor/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      },
      body: JSON.stringify({
        tutor: id.toLowerCase(),
        subject: code
      })
    })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error('could not make DELETE request on subject on tutor');
        }
        return res.json();
      })
      .then((data) => {
        console.log('ok MATERIA BORRADA PERRO');
        showSuccessModal();
        //onClickSuccessAcceptTutee()
        //window.location.reload(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleDelete = (subjectCode: any) => {
    const arr = subjectsFromTutor.filter(
      (item: any) => item.code.toUpperCase() !== subjectCode
    );
    setSubjectsFromTutor((subjectsFromTutor: any) => arr);
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
        style={{ flexDirection: 'column' }}
      >
        <div id="message" className={stylesSubjects.successMessage}>
          <p>Materia agregada con éxito.</p>
        </div>
        <div className={stylesSubjects.wrapperSearchBar}>
          <SearchBar
            handleSuggestions={handleSubject}
            suggestions={subjectsFromApi}
          />
        </div>

        <div className={stylesSubjects.wrapper}>
          {subjectsFromTutor.map((materia: any, index: any) => (
            <div key={index} className={stylesSubjects.subjectsWrapper}>
              <li className={stylesSubjects.materia}>
                {materia.code} {materia.name}
                <button
                  onClick={() => handleDelete(materia.code)}
                  className={stylesSubjects.icon}
                >
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
