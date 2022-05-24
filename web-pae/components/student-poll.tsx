import { useState } from 'react';
import pStyles from '../css/components/studentPoll.module.css';
import ButtonTemplate from './button-template';
import Poll from './poll';
import Popup from './popup';
import TextInput from './text-input';
const StudentPoll = (props: {}) => {
  /*const [dbQuestions, setDbQuestions] = useState([]);
  setDbQuestions([
    'Totalmente de acuerdo',
    'De acuerdo',
    'En desacuerdo',
    'Totalmente en desacuerdo'
  ]);*/
  let questions = [
    {
      poll: 'Mi experiencia fue satisfactoria',
      id: 'a1'
    },
    {
      poll: 'Mi duda fue resuelta',
      id: 'a2'
    },
    {
      poll: 'El asesor estaba preparado para resolver mis dudas',
      id: 'a3'
    },
    {
      poll: 'Recomendaria el servicio de PAE',
      id: 'a4'
    },
    {
      poll: 'Recomendaria el servicio pene pene de PAE',
      id: 'a5'
    }
  ];
  return (
    <div className={pStyles.main}>
      <Popup title="Encuesta de satisfacción" line>
        <div className={pStyles.questions}>
          <div className={pStyles.options}>
            <div className={pStyles.empty}></div>
            <div className={pStyles.text}>
              <p className={pStyles.value}>Totalmente en desacuerdo</p>
              <p className={pStyles.value}>En desacuerdo</p>
              <p className={pStyles.value}>De acuerdo</p>
              <p className={pStyles.value}>Totalmente de acuerdo</p>
            </div>
          </div>
          {questions.map(function (obj) {
            return <Poll key={obj.id} question={obj.poll} name={obj.id}></Poll>;
          })}
          <input
            type="textArea"
            placeholder="Comentarios"
            maxLength={100}
            className={pStyles.comment}
          ></input>
          <div className={pStyles.button}>
            <ButtonTemplate variant="confirm">Enviar</ButtonTemplate>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default StudentPoll;
