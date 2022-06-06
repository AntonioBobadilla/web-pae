import styles from '@/css-components/scheduleTutoring.module.css';
import { useEffect, useState } from 'react';
import ButtonTemplate from '../button-template';
import SearchBar from '../search-bar';

const TutoringSubject = () => {
  // AQUÍ SE GUARDAN LOS VALORES SELECCIONADOS EN FORMA DE ARREGLO
  const [valuesSelected, changeValues] = useState([]);
  const [subjectsFromApi, setSubjectsFromApi] = useState([]);

  useEffect(() => {
    // showValues();
  }, [valuesSelected]);

  const cleanHTML = () => {
    const div = document.querySelector('.values');
    while (div.firstChild) {
      div?.removeChild(div.firstChild);
    }
  };

  useEffect(() => {
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

  const handleSuggestions = (suggestion) => {
    changeValues((valuesSelected) => [...valuesSelected, suggestion]);
    // showValues();
  };

  const deleteItem = (e) => {
    const itemToDelete = e.target.parentElement.parentElement.id;
    console.log(itemToDelete);
    changeValues(valuesSelected.filter((item) => item != itemToDelete));
  };

  const test = () => {
    console.log('agregar funcionalidad cuando hace click xd');
  };

  return (
    <div className={styles.wrapper}>
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
      <div className={styles.continueButton}>
        <ButtonTemplate variant="primary">BUSCAR ASESORÍAS</ButtonTemplate>
      </div>
    </div>
  );
};

export default TutoringSubject;
