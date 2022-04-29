import React, { useState } from 'react';
import ButtonTemplate from './button-template';

interface RegisterCalendarProps {
  nextStep: () => void;
  previousStep: () => void;
}

const RegisterCalendar = ({
  nextStep,
  previousStep
}: RegisterCalendarProps) => {
  const [subjects, setSubjects] = useState([]);
  const [subjectsFiltered, setSubjectsFiltered] = useState([]);
  const [subjectsSelected, setSubjectsSelected] = useState([]);
  const [query, setQuery] = useState('');
  return (
    <div>
      <ButtonTemplate
        color="039BE5"
        text="ANTERIOR"
        onClickFunction={() => previousStep()}
      />

      <ButtonTemplate
        color="039BE5"
        text="SIGUIENTE"
        onClickFunction={() => nextStep()}
      />
    </div>
  );
};

export default RegisterCalendar;
