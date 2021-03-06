import { useTranslation } from 'next-i18next';
import { selectToken } from '@/redux/user';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'store/hook';
import styles from '../css/components/pollResults.module.css';

interface PollResultProps {
  curTab: boolean;
}

const PollResults = ({ curTab }: PollResultProps) => {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);
  const { t } = useTranslation('admin-polls');
  const token = useAppSelector(selectToken);

  const getPollsfromApi = () => {
    fetch('https://server-pae.azurewebsites.net/pollresult/', {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`
      }
    })
      .then((resp) => resp.json())
      .then(function (data) {
        // console.log(data)
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
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.empty} />
        <div className={styles.values}>
          <span className={styles.value}>{t('Totally disagree')}</span>
          <span className={styles.value}>{t('Disagree')}</span>
          <span className={styles.value}>{t('Agree')}</span>
          <span className={styles.value}>{t('Totally agree')}</span>
        </div>
      </div>
      <div className={styles.questionContainer}>
        {data.map(function (item: any, index) {
          return (
            <div key={index} className={styles.questions}>
              <span className={styles.question}>{item.question.body}</span>
              <div className={styles.results}>
                <span className={styles.result}>{item.results[0].total}</span>
                <span className={styles.result}>{item.results[1].total}</span>
                <span className={styles.result}>{item.results[2].total}</span>
                <span className={styles.result}>{item.results[3].total}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PollResults;
