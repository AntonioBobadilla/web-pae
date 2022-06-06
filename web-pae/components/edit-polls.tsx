import { useEffect, useState } from 'react';
import styles from '../css/components/editPolls.module.css';
import cx from 'classnames';
import DeleteQuestion from './dialogs/delete-question';

const EditPolls = () => {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);
  const [question, setQuestion] = useState([]);
  const [modifiedQuestion, setModifiedQuestion] = useState([]);
  const [add, setAdd] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [id, setId] = useState(null);

  const modifyQuestion = (e) => {
    let element = e.target.parentElement.parentElement.childNodes[0];
    let element2 = e.target.parentElement.parentElement.childNodes[1];
    let newButton = e.target.parentElement.childNodes[0];
    let currButton = e.target;
    element.style.display = 'block';
    element2.style.display = 'none';
    newButton.style.display = 'block';
    currButton.style.display = 'none';
  };

  const confirmModifyQuestion = (e, id) => {
    editQuestion(id);
    let element = e.target.parentElement.parentElement.childNodes[0];
    let element2 = e.target.parentElement.parentElement.childNodes[1];
    let newButton = e.target.parentElement.childNodes[1];
    let currButton = e.target;
    element.style.display = 'none';
    element2.style.display = 'flex';
    newButton.style.display = 'flex';
    currButton.style.display = 'none';
  };

  const visiblePopUp = () => {
    setPopUp(true);
  };

  const notVisiblePopUp = () => {
    setPopUp(false);
  };

  const changeAddVisibility = () => {
    setAdd(!add);
  };

  const getPollsfromApi = () => {
    fetch('http://server-pae.azurewebsites.net/question/')
      .then((resp) => resp.json())
      .then(function (data) {
        //console.log(data)
        setData(data);
        setPending(false);
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getPollsfromApi();
  }, []);

  const deleteQuestion = () => {
    fetch('http://server-pae.azurewebsites.net/question/' + id + '/', {
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

  const editQuestion = (id) => {
    fetch('http://server-pae.azurewebsites.net/question/' + id + '/', {
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

  const addQuestion = (e) => {
    fetch('http://server-pae.azurewebsites.net/question/', {
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
        let inputText = e.target.parentElement.parentElement.childNodes[0];
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

  const questionChange = (e) => {
    setQuestion(e.target.value);
  };

  const questionModifyChange = (e) => {
    setModifiedQuestion(e.target.value);
  };

  const checkItemState = (idItem) => {
    setId(idItem);
    visiblePopUp();
  };

  return (
    <div className={styles.main}>
      {pending && <div>Cargando datos...</div>}
      <div className={styles.questionsContainer}>
        {data.map(function (item, index) {
          return (
            <div key={index} className={styles.questions}>
              <input
                className={styles.inputText2}
                placeholder={item.body}
                onChange={questionModifyChange}
              ></input>
              <span className={styles.question}>{item.body}</span>
              <div className={styles.buttons}>
                <i
                  className={cx('bi bi-check-lg', styles.confirmQuestionChange)}
                  onClick={() => confirmModifyQuestion(event, item.id)}
                ></i>
                <i
                  className={cx('bi bi-pencil-fill', styles.editQuestion)}
                  onClick={modifyQuestion}
                ></i>
                <i
                  className={cx('bi bi-trash', styles.delete)}
                  onClick={() => checkItemState(item.id)}
                ></i>
              </div>
            </div>
          );
        })}
      </div>
      <DeleteQuestion
        visible={popUp}
        setVisible={setPopUp}
        onClickFunction={() => deleteQuestion()}
        onClickCancel={notVisiblePopUp}
      ></DeleteQuestion>
      <div className={add ? styles.questionInput : styles.hidden}>
        <input
          type="text"
          placeholder="Introduzca la nueva pregunta"
          onChange={questionChange}
          className={styles.inputText}
        ></input>
        <div className={styles.buttons2}>
          <i
            className={cx('bi bi-check-lg', styles.questionCorrect)}
            onClick={() => addQuestion(event)}
          ></i>
          <i
            className={cx('bi bi-x-circle', styles.cancel)}
            onClick={changeAddVisibility}
          ></i>
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
