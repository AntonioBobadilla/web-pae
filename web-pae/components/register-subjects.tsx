import styles from '@/css-components/scheduleTutoring.module.css';
import {
  selectLoading,
  selectSubjects,
  setSubjects
} from '@/redux/create-tutor';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from 'store/hook';
import ButtonTemplate from './button-template';
import SearchBar, { Subject } from './search-bar';

interface RegisterSubjectsProps {
  previousStep: () => void;
  nextStep: () => void;
}

const RegisterSubjects = ({
  previousStep,
  nextStep
}: RegisterSubjectsProps) => {
  const [subjectsFiltered, setSubjectsFiltered] = useState([]);
  const [subjectsSelected, setSubjectsSelected] = useState([]);
  const [query, setQuery] = useState('');
  const isLoading = useAppSelector(selectLoading);
  const selectedSubjects = useAppSelector(selectSubjects);
  const router = useRouter();
  const [subjectsFromApi, setSubjectsFromApi] = useState([]);
  const [valuesSelected, changeValues] = useState(selectedSubjects);
  const dispatch = useAppDispatch();

  const usefetch = async () => {
    const response = await fetch(
      'https://server-pae.azurewebsites.net/subject/'
    );
    const data = await response.json();
    // console.log(data);
    setSubjectsFromApi(data);
  };

  const handleSuggestions = (suggestion: Subject) => {
    if (valuesSelected.includes(suggestion)) {
      toast('Subject already selected', {
        icon: '😿'
      });
      return;
    }
    changeValues((values) => [...values, suggestion]);
    // showValues();
  };

  React.useEffect(() => {
    usefetch();
  }, []);

  React.useEffect(() => {
    dispatch(setSubjects(valuesSelected));
  }, [valuesSelected]);

  const cleanHTML = () => {
    const div = document.querySelector('.values');
    while (div?.firstChild) {
      div?.removeChild(div.firstChild);
    }
  };

  const deleteItem = (e: any) => {
    const itemToDelete = e.target.parentElement.parentElement.id;
    // console.log(itemToDelete);
    changeValues(valuesSelected.filter(({ code }) => code !== itemToDelete));
  };

  const { t } = useTranslation('student-home');
  return (
    <div className={styles.wrapper}>
      <h3
        className={styles.title}
        style={{ marginTop: '4vh', fontWeight: 'lighter' }}
      >
        Agrega las materias de las que te gustaría dar asesoría.
      </h3>
      <SearchBar
        handleSuggestions={(subject) => handleSuggestions(subject)}
        suggestions={subjectsFromApi}
      />
      <div className={styles.selectedSubjects}>
        {valuesSelected.length !== 0 && (
          <h2 className={styles.title}>{t('Selected subjects')}</h2>
        )}
        <div className={styles.values}>
          {valuesSelected.map((value, index) => (
            <p
              key={`${value}${index.toString()}`}
              id={value.code}
              className={styles.element}
            >
              {value.code} {value.name}
              <button
                id={value.code}
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
          onClick={() => nextStep()}
          disabled={valuesSelected.length === 0 || isLoading}
          loading={isLoading}
        >
          {t('FINISH REGISTER')}
        </ButtonTemplate>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default RegisterSubjects;
