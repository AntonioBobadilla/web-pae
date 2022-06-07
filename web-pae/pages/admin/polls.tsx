import { useEffect, useState } from 'react';
import styles from '../../css/admin/polls.module.css';

const Polls = () => {
  const [currentTab, setCurrentTab] = useState('');

  const Results = () => {
    setCurrentTab('UF');
  };

  const IndResults = () => {
    setCurrentTab('addUF');
  };
  useEffect(() => {
    setCurrentTab('UF');
  }, []);
  return (
    <div className={styles.main}>
      <div className={styles.tabs}></div>
    </div>
  );
};

export default Polls;
