
import { useTranslation } from 'next-i18next';
import { selectToken } from '@/redux/user';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAppSelector } from 'store/hook';
import Styles from '../css/components/subject-form.module.css';
import SubjectAdded from './dialogs/subject-added';

const SubjectForm = () => {
  const [code, setCode] = useState([]);
  const [name, setName] = useState([]);
  const [validUF, setValidUF] = useState(Boolean);
  const { t } = useTranslation('admin-subjects');

  const token = useAppSelector(selectToken);

  const isValid = () => {
    setValidUF(true);
  };

  const addSubject = (e: any) => {
    fetch('https://server-pae.azurewebsites.net/subject/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      },
      body: JSON.stringify({
        code,
        name,
        semester: 1
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.code === 'string') {
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
  const codeChange = (e: any) => {
    let mycode = e.target.value;
    mycode = mycode.toUpperCase();
    e.target.value = mycode;
    setCode(mycode);
  };
  const nameChange = (e: any) => {
    let myname = e.target.value;
    myname = myname.toUpperCase();
    e.target.value = myname;
    setName(myname);
  };
  return (
    <div className={Styles.main}>
      <input
        type="text"
        placeholder={t('CODE*')}
        className={Styles.input}
        onChange={codeChange}
      />
      <input
        type="text"
        placeholder={t('NAME*')}
        className={Styles.input}
        onChange={nameChange}
      />
      <button className={Styles.button} onClick={() => addSubject(event)}>
        {t('Add')}
      </button>
      <SubjectAdded visible={validUF} setVisible={setValidUF} />
    </div>
  );
};

export default SubjectForm;
