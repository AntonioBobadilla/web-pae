import { useEffect, useState } from 'react';
import Carousel, { consts } from 'react-elastic-carousel';
import { isContext } from 'vm';
import styles from '../css/components/pollIndividualResults.module.css';
import classNames from 'classnames';

interface IndividualResultProps {
  curTab: boolean;
}

const PollIndividualResults = ({ curTab }: IndividualResultProps) => {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);
  const getPollsfromApi = () => {
    fetch('http://server-pae.azurewebsites.net/poll/')
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
  curTab ? getPollsfromApi() : null;

  function myArrow({ type, onClick, isEdge }) {
    const pointer = type === consts.PREV ? 'left' : 'right';
    return (
      <div
        className={classNames(styles.arrowButton, isEdge ? styles.edge : null)}
        onClick={onClick}
        role="button"
      >
        <i className={`bi bi-chevron-${pointer}`} />
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <Carousel pagination={false} renderArrow={myArrow}>
        {data.map(function (item, index) {
          let answers = item.question_polls;
          return (
            <div key={index} className={styles.poll}>
              <span className={styles.tutor}>{item.tutor.name}</span>
              <div className={styles.header}>
                <div className={styles.empty}></div>
                <div className={styles.values}>
                  <span className={styles.value}>Totalmente en desacuerdo</span>
                  <span className={styles.value}>En desacuerdo</span>
                  <span className={styles.value}>De acuerdo</span>
                  <span className={styles.value}>Totalmente de acuerdo</span>
                </div>
              </div>
              <div className={styles.pollMap}>
                {answers.map(function (item2, index2) {
                  return (
                    <div key={index2} className={styles.answersContainer}>
                      <div className={styles.answers}>
                        <span className={styles.question}>
                          {item2.question.body}
                        </span>
                      </div>
                      <div className={styles.choices}>
                        <input
                          type="radio"
                          checked={item2.result == '1' ? true : false}
                          className={styles.radio}
                        ></input>
                        <input
                          type="radio"
                          checked={item2.result == '2' ? true : false}
                          className={styles.radio}
                        ></input>
                        <input
                          type="radio"
                          checked={item2.result == '3' ? true : false}
                          className={styles.radio}
                        ></input>
                        <input
                          type="radio"
                          checked={item2.result == '4' ? true : false}
                          className={styles.radio}
                        ></input>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={styles.comment}>{item.comment}</div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default PollIndividualResults;
