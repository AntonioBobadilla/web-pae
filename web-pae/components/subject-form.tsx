import { useState } from 'react';
import Styles from '../css/components/subject-form.module.css';
import SubjectAdded from './dialogs/subject-added';
import SearchBar from './search-bar';

const SubjectForm = () => {
  const [code, setCode] = useState([]);
  const [name, setName] = useState([]);
  const [validUF, setValidUF] = useState(Boolean);

  const isValid = () => {
    setValidUF(true);
  };

  const addSubject = () => {
    fetch('http://server-pae.azurewebsites.net/subject/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: code,
        name: name,
        semester: 1
      })
    })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error('could not make PUT request for that endpoint');
        }
        isValid();
        return res.json();
      })
      .then((data) => {
        console.log('ok');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const codeChange = (e: any) => {
    setCode(e.target.value);
  };
  const nameChange = (e: any) => {
    setName(e.target.value);
  };
  return (
    <div className={Styles.main}>
      <input
        type="text"
        placeholder="CLAVE*"
        className={Styles.input}
        onChange={codeChange}
      ></input>
      <input
        type="text"
        placeholder="NOMBRE*"
        className={Styles.input}
        onChange={nameChange}
      ></input>
      <button className={Styles.button} onClick={addSubject}>
        Agregar
      </button>
      <SubjectAdded visible={validUF} setVisible={setValidUF}></SubjectAdded>
    </div>
  );
};

export default SubjectForm;
