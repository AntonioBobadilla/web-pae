/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from 'next-i18next'; // add this
import styles from '@/css-components/scheduleTutoring.module.css';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { selectSubject, setSubject } from 'store/reducers/schedule-tutoring';
import ButtonTemplate from '../button-template';
import SearchBar, { Subject } from '../search-bar';




const TutoringSubject = ({
  handleNextStep
}: {
  handleNextStep: () => void;
}) => {
  const { t } = useTranslation('student-schedule-tutoring'); // add this
  const subject = useAppSelector(selectSubject);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.scheduleTutoring.isLoading);
  // const [valuesSelected, changeValues] = useState<Subject[]>([]);
  const [subjectsFromApi, setSubjectsFromApi] = useState([]);

  const usefetch = async () => {
    const response = await fetch(
      'https://server-pae.azurewebsites.net/subject/'
    );
    const data = await response.json();
    // console.log(data);
    setSubjectsFromApi(data);
  };

  React.useEffect(() => {
    usefetch();
  }, []);

  const handleSuggestions = (suggestion: Subject) => {
    dispatch(setSubject(suggestion));
    // showValues();
  };

  const deleteItem = (e: any) => {
    // console.log(itemToDelete);
    dispatch(setSubject(null));
  };

  return (
    <div className={styles.wrapper}>
      <SearchBar
        handleSuggestions={(subj) => handleSuggestions(subj)}
        suggestions={subjectsFromApi}
      />
      <div className={styles.selectedSubjects}>
        <h2 className={styles.title}>{t('Materia escogida')}</h2>
        <div className={styles.values}>
          {subject && (
            <div
              key={subject.code}
              id={subject.code}
              className={styles.element}
            >
              {subject.code} {subject.name}
              <button
                id={subject.code}
                onClick={deleteItem}
                type="button"
                className={styles.delete}
              >
                <i className="bi bi-trash3" />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.continueButton}>
        <ButtonTemplate
          variant="primary"
          disabled={!subject || isLoading}
          onClick={handleNextStep}
          loading={isLoading}
        >
          {t('BUSCAR ASESOR??AS')}
        </ButtonTemplate>
      </div>
    </div>
  );
};

export default TutoringSubject;
