import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ButtonTemplate from './button-template';
import SearchBar from './search-bar';
import styles from '@/css-components/scheduleTutoring.module.css';

interface RegisterSubjectsProps {
  previousStep: () => void;
}

const RegisterSubjects = ({ previousStep }: RegisterSubjectsProps) => {
  const [subjects, setSubjects] = useState([]);
  const [subjectsFiltered, setSubjectsFiltered] = useState([]);
  const [subjectsSelected, setSubjectsSelected] = useState([]);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const [subjectsFromApi, setSubjectsFromApi] = useState([]);
  const [valuesSelected, changeValues] = useState([]);

  const handleSuggestions = (suggestion) => {
    changeValues((valuesSelected) => [...valuesSelected, suggestion]);
    // showValues();
  };

  React.useEffect(() => {
    fetch('http://localhost:3000/api/subjects')
    .then((resp) => resp.json())
    .then(function(data) {
      setSubjectsFromApi(data)
      })
}, [])

const showValues = () => {
  const div = document.querySelector('.values');
  cleanHTML();
  valuesSelected.forEach((item) => {
    const value = document.createElement('p');
    value.innerHTML = item;
    div.appendChild(value);
  });
};

const cleanHTML = () => {
  const div = document.querySelector('.values');
  while (div.firstChild) {
    div?.removeChild(div.firstChild);
  }
};

const deleteItem = (e) => {
  const itemToDelete = e.target.parentElement.parentElement.id;
  console.log(itemToDelete);
  changeValues(valuesSelected.filter((item) => item != itemToDelete));
};

  return (
    <div style={{'width':'50%'}}>
      <div className={styles.wrapper} >
      <SearchBar
        function={handleSuggestions}
        suggestions={subjectsFromApi}
      />
      <div className={styles.selectedSubjects}>
        <h2 className={styles.title}>Materia escogida</h2>
        <div className={styles.values}>
          {valuesSelected.map((value, index) => (
            <p key={index} id={value} className={styles.element}>
              {value}{' '}
              <button id={value} onClick={deleteItem} className={styles.delete}>
                <i className="bi bi-trash3" />
              </button>
            </p>
          ))}
        </div>
      </div>
      </div>
      <ButtonTemplate
        variant="primary"
        onClick={() => router.push('/tutor/register-confirmation')}
        style={{'width':'50%', 'margin':'0 auto', 'height':'40px'}}
      >
        CONCLUIR REGISTRO
      </ButtonTemplate>
    </div>
  );
};

export default RegisterSubjects;
