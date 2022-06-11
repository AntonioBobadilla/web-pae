import classNames from 'classnames';
import { useEffect, useState } from 'react';
import Carousel from 'react-elastic-carousel';
import consts from "react-elastic-carousel";
import styles from '../css/components/pollIndividualResults.module.css';

interface IndividualResultProps {
  curTab: boolean;
}

const PollIndividualResults = ({ curTab }: IndividualResultProps) => {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);
  const getPollsfromApi = () => {
    fetch('http://server-pae.azurewebsites.net/poll/')
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
  curTab ? getPollsfromApi() : null;

  function myArrow({
    type,
    onClick,
    isEdge
  }: {
    type: any;
    onClick: any;
    isEdge: any;
  }) {
    const pointer = type === 'PREV' ? 'left' : 'right';
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
      <Carousel pagination={false} renderArrow={myArrow} isRTL={false}>
        {data.map((item: any, index) => {
          const answers = item.question_polls;
          return (
            <div key={index} className={styles.poll}>
              <span className={styles.tutor}>{item.tutor.name}</span>
              <div className={styles.header}>
                <div className={styles.empty} />
                <div className={styles.values}>
                  <span className={styles.value}>Totalmente en desacuerdo</span>
                  <span className={styles.value}>En desacuerdo</span>
                  <span className={styles.value}>De acuerdo</span>
                  <span className={styles.value}>Totalmente de acuerdo</span>
                </div>
              </div>
              <div className={styles.pollMap}>
                {answers.map((item2: any, index2: any) => (
                  <div key={index2} className={styles.answersContainer}>
                    <div className={styles.answers}>
                      <span className={styles.question}>
                        {item2.question.body}
                      </span>
                    </div>
                    <div className={styles.choices}>
                      <input
                        type="radio"
                        checked={item2.result === '1'}
                        className={styles.radio}
                      />
                      <input
                        type="radio"
                        checked={item2.result === '2'}
                        className={styles.radio}
                      />
                      <input
                        type="radio"
                        checked={item2.result === '3'}
                        className={styles.radio}
                      />
                      <input
                        type="radio"
                        checked={item2.result === '4'}
                        className={styles.radio}
                      />
                    </div>
                  </div>
                ))}
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
