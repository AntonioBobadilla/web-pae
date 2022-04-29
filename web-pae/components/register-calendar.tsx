import React, { useState } from 'react';
import registerSteps from '../helpers/steps';
import ButtonTemplate from './button-template';

interface RegisterCalendarProps {
  setStep: (step: any) => void;
}

const RegisterCalendar = ({ setStep }: RegisterCalendarProps) => {
  const [subjects, setSubjects] = useState([]);
  const [subjectsFiltered, setSubjectsFiltered] = useState([]);
  const [subjectsSelected, setSubjectsSelected] = useState([]);
  const [query, setQuery] = useState('');
  return (
    <div>
      <ButtonTemplate
        color="039BE5"
        text="ANTERIOR"
        onClickFunction={() => setStep(registerSteps.REGISTER)}
      />

      <ButtonTemplate
        color="039BE5"
        text="SIGUIENTE"
        onClickFunction={() => setStep(registerSteps.SUBJECTS)}
      />
    </div>
  );
};

export default RegisterCalendar;
