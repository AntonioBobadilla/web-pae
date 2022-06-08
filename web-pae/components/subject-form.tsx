import { useState } from 'react';
import Styles from '../css/components/subject-form.module.css';
import SubjectAdded from './dialogs/subject-added';
import SearchBar from './search-bar';
import toast, { Toaster } from 'react-hot-toast';

const SubjectForm = () => {
  const [code, setCode] = useState([]);
  const [name, setName] = useState([]);
  const [validUF, setValidUF] = useState(Boolean);

  const isValid = () => {
    setValidUF(true);
  };

  const addSubject = (e) => {
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
        return res.json();
      })
      .then((data) => {
        if (typeof data.code == 'string') {
          isValid();
        } else {
          console.log(data.code);
          toast.error(data.code[0]);
        }
        e.target.parentElement.childNodes[0].value = '';
        e.target.parentElement.childNodes[1].value = '';
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const codeChange = (e) => {
    setCode(e.target.value);
  };
  const nameChange = (e) => {
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
      <button className={Styles.button} onClick={() => addSubject(event)}>
        Agregar
      </button>
      <SubjectAdded visible={validUF} setVisible={setValidUF}></SubjectAdded>
    </div>
  );
};

export default SubjectForm;
