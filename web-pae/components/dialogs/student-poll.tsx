import { selectToken } from '@/redux/user';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAppSelector } from 'store/hook';
import pStyles from '../../css/components/dialogs/studentPoll.module.css';
import ButtonTemplate from '../button-template';
import ClosablePopup from '../closable-popup';
import Poll from '../poll';

type StudentPollProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  questions: any[];
  idTutoring: number;
};

const StudentPoll = ({
  visible,
  setVisible,
  questions,
  idTutoring
}: StudentPollProps) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const token = useAppSelector(selectToken);
  const sendResults = () => {
    setLoading(true);
    const results = questions.map((item) => {
      const answer = document.getElementById(
        `storeValue${item.id}`
      ) as HTMLInputElement;
      console.log(answer.value);
      return {
        question_id: item.id,
        result: parseInt(answer.value)
      };
    });

    fetch('http://10.50.84.114:4008/poll/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      },
      body: JSON.stringify({
        question_polls: results,
        comment: text,
        tutoring: idTutoring
      })
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success('Enviado com éxito');
        setLoading(false);
        setVisible(false);
      })
      .catch((err) => {
        toast.error('Error al enviar');
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <ClosablePopup
      title="Encuesta"
      line
      visible={visible}
      style={pStyles.container}
      setVisible={setVisible}
    >
      <div className={pStyles.questions}>
        <div className={pStyles.options}>
          <div className={pStyles.empty} />
          <div className={pStyles.text}>
            <p className={pStyles.value}>Totalmente en desacuerdo</p>
            <p className={pStyles.value}>En desacuerdo</p>
            <p className={pStyles.value}>De acuerdo</p>
            <p className={pStyles.value}>Totalmente de acuerdo</p>
          </div>
        </div>
        {questions.map(function (obj) {
          return <Poll key={obj.id} question={obj.body} name={obj.id} />;
        })}
        <textarea
          placeholder="Comentarios"
          maxLength={250}
          className={pStyles.comment}
          value={text}
          onChange={(e) => setText(e.target.value.toString())}
        />
        <div className={pStyles.button}>
          <ButtonTemplate
            variant="confirm"
            onClick={() => sendResults()}
            loading={loading}
            disabled={loading || text.length === 0}
          >
            Enviar
          </ButtonTemplate>
        </div>
      </div>
    </ClosablePopup>
  );
};

export default StudentPoll;
