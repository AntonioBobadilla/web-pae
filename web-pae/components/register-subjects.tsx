import styles from '@/css-components/scheduleTutoring.module.css';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ButtonTemplate from './button-template';
import SearchBar from './search-bar';

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

  const handleSuggestions = (suggestion: any) => {
    changeValues((valuesSelected) => [...valuesSelected, suggestion]);
    // showValues();
  };

  React.useEffect(() => {
    fetch('http://localhost:3000/api/subjects')
      .then((resp) => resp.json())
      .then((data) => {
        setSubjectsFromApi(data);
      });
  }, []);

  const cleanHTML = () => {
    const div = document.querySelector('.values');
    while (div?.firstChild) {
      div?.removeChild(div.firstChild);
    }
  };

  const showValues = () => {
    const div = document.querySelector('.values');
    cleanHTML();
    valuesSelected.forEach((item) => {
      const value = document.createElement('p');
      value.innerHTML = item;
      div?.appendChild(value);
    });
  };

  const deleteItem = (e: any) => {
    const itemToDelete = e.target.parentElement.parentElement.id;
    console.log(itemToDelete);
    changeValues(valuesSelected.filter((item) => item !== itemToDelete));
  };

  return (
    <div className={styles.wrapper}>
      <SearchBar function={handleSuggestions} suggestions={subjectsFromApi} />
      <div className={styles.selectedSubjects}>
        {valuesSelected.length !== 0 && (
          <h2 className={styles.title}>MATERIAS SELECCIONADAS</h2>
        )}
        <div className={styles.values}>
          {valuesSelected.map((value, index) => (
            <p
              key={`${value}${index.toString()}`}
              id={value}
              className={styles.element}
            >
              {value}{' '}
              <button
                id={value}
                onClick={deleteItem}
                className={styles.delete}
                type="button"
              >
                <i className="bi bi-trash3" />
              </button>
            </p>
          ))}
        </div>
      </div>
      <div className={styles.button}>
        <ButtonTemplate
          variant="primary"
          onClick={() => router.push('/tutor/register-confirmation')}
          disabled={valuesSelected.length === 0}
        >
          CONCLUIR REGISTRO
        </ButtonTemplate>
      </div>
    </div>
  );
};

export default RegisterSubjects;
