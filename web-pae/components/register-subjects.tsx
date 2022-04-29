import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ButtonTemplate from './button-template';
import SearchBar from './frontend-searchBar';

interface RegisterSubjectsProps {
  previousStep: () => void;
}

const RegisterSubjects = ({ previousStep }: RegisterSubjectsProps) => {
  const [subjects, setSubjects] = useState([]);
  const [subjectsFiltered, setSubjectsFiltered] = useState([]);
  const [subjectsSelected, setSubjectsSelected] = useState([]);
  const [query, setQuery] = useState('');
  const router = useRouter();
  return (
    <div>
      <SearchBar />

      <h2>MATERIAS SELECCIONADAS</h2>
      <ButtonTemplate
        color="039BE5"
        text="CONCLUIR REGISTRO"
        onClickFunction={() => router.push('/tutor/register-confirmation')}
      />
    </div>
  );
};

export default RegisterSubjects;
