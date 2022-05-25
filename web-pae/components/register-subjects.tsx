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
  return (
    <div>
      <SearchBar />

      <h2>MATERIAS SELECCIONADAS</h2>
      <ButtonTemplate
        variant="primary"
        onClick={() => router.push('/tutor/register-confirmation')}
      >
        CONCLUIR REGISTRO
      </ButtonTemplate>
    </div>
  );
};

export default RegisterSubjects;
