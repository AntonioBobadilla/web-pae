import cx from 'classnames';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import styles from '../css/components/editPolls.module.css';
import DeleteQuestion from './dialogs/delete-question';
import ModifyQuestion from './dialogs/modify-question';

const EditPolls = () => {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);
  const [question, setQuestion] = useState([]);
  const [modifiedQuestion, setModifiedQuestion] = useState([]);
  const [add, setAdd] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [popUp2, setPopUp2] = useState(false);
  const [id, setId] = useState(null);
  const { t } = useTranslation('admin-polls');

  const modifyQuestion = (e: any) => {
    visiblePopUp2();
    const element = e.target.parentElement.parentElement.childNodes[0];
    const element2 = e.target.parentElement.parentElement.childNodes[1];
    const newButton = e.target.parentElement.childNodes[0];
    const currButton = e.target;
    element.style.display = 'block';
    element2.style.display = 'none';
    newButton.style.display = 'block';
    currButton.style.display = 'none';
  };

  const confirmModifyQuestion = (e: any, id: any) => {
    editQuestion(id);
    const element = e.target.parentElement.parentElement.childNodes[0];
    const element2 = e.target.parentElement.parentElement.childNodes[1];
    const newButton = e.target.parentElement.childNodes[1];
    const currButton = e.target;
    element.style.display = 'none';
    element2.style.display = 'flex';
    newButton.style.display = 'flex';
    currButton.style.display = 'none';
  };

  const visiblePopUp = () => {
    setPopUp(true);
  };
  const visiblePopUp2 = () => {
    setPopUp2(true);
  };

  const notVisiblePopUp = () => {
    setPopUp(false);
  };
  const notVisiblePopUp2 = () => {
    setPopUp2(false);
  };

  const changeAddVisibility = () => {
    setAdd(!add);
  };

  const getPollsfromApi = () => {
    fetch('https://server-pae.azurewebsites.net/question/')
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data)
        setData(data);
        setPending(false);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getPollsfromApi();
  }, []);

  const deleteQuestion = () => {
    fetch(`https://server-pae.azurewebsites.net/question/${id}/`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error('could not make POST request for that endpoint');
        } else if (res.status == 204) {
          notVisiblePopUp();
          getPollsfromApi();
        }
        return res.json();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const editQuestion = (id: any) => {
    fetch(`https://server-pae.azurewebsites.net/question/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body: modifiedQuestion })
    })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error('could not make PUT request for that endpoint');
        }
        getPollsfromApi();
        return res.json();
      })
      .then((data) => {
        console.log('ok');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const addQuestion = (e: any) => {
    fetch('https://server-pae.azurewebsites.net/question/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        body: question
      })
    })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error('could not make PUT request for that endpoint');
        }
        const inputText = e.target.parentElement.parentElement.childNodes[0];
        inputText.value = '';
        getPollsfromApi();
        return res.json();
      })
      .then((data) => {
        console.log('ok');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const questionChange = (e: any) => {
    setQuestion(e.target.value);
  };

  const questionModifyChange = (e: any) => {
    setModifiedQuestion(e.target.value);
  };

  const checkItemState = (idItem: any) => {
    setId(idItem);
    visiblePopUp();
  };

  return (
    <div className={styles.main}>
      {pending && <div>Cargando datos...</div>}
      <div className={styles.questionsContainer}>
        {data.map((item: any, index) => (
          <div key={index} className={styles.questions}>
            <input
              className={styles.inputText2}
              placeholder={item.body}
              onChange={questionModifyChange}
            />
            <span className={styles.question}>{item.body}</span>
            <div className={styles.buttons}>
              <i
                className={cx('bi bi-check-lg', styles.confirmQuestionChange)}
                onClick={() => confirmModifyQuestion(event, item.id)}
              />
              <i
                className={cx('bi bi-pencil-fill', styles.editQuestion)}
                onClick={modifyQuestion}
              />
              <i
                className={cx('bi bi-trash', styles.delete)}
                onClick={() => checkItemState(item.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <DeleteQuestion
        visible={popUp}
        setVisible={setPopUp}
        onClickFunction={() => deleteQuestion()}
        onClickCancel={notVisiblePopUp}
      />

      <ModifyQuestion
        visible={popUp2}
        setVisible={setPopUp2}
        onClickCancel={notVisiblePopUp2}
      />
      <div className={add ? styles.questionInput : styles.hidden}>
        <input
          type="text"
          placeholder={t('Enter new question')}
          onChange={questionChange}
          className={styles.inputText}
        />
        <div className={styles.buttons2}>
          <i
            className={cx('bi bi-check-lg', styles.questionCorrect)}
            onClick={() => addQuestion(event)}
          />
          <i
            className={cx('bi bi-x-circle', styles.cancel)}
            onClick={changeAddVisibility}
          />
        </div>
      </div>
      <div className={styles.addQuestionContainer}>
        <button
          className={styles.addQuestionButton}
          onClick={changeAddVisibility}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default EditPolls;
