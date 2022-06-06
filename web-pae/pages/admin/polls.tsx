import EditPolls from '@/components/edit-polls';
import PollResults from '@/components/poll-results';
import Tabs from '@/components/tabs';
import { ReactElement, useEffect, useState } from 'react';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import styles from '../../css/admin/polls.module.css';

const Polls = () => {
  const [currentTab, setCurrentTab] = useState('');

  const Results = () => {
    setCurrentTab('Results');
  };

  const IndResults = () => {
    setCurrentTab('IndResults');
  };

  const EditPoll = () => {
    setCurrentTab('EditPoll');
  };

  useEffect(() => {
    setCurrentTab('Results');
  }, []);

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
      poll: 'Recomendaria el servicio de PAE',
      id: 'a5'
    }
  ];
  return (
    <div className={styles.main}>
      <div className={styles.tabs}>
        <div className={styles.resultsTab}>
          <Tabs
            handleClick={Results}
            text="Resultados"
            active={currentTab == 'Results' ? true : false}
          ></Tabs>
        </div>
        <div className={styles.indResultsTab}>
          <Tabs
            handleClick={IndResults}
            text="Resultados individuales"
            active={currentTab == 'IndResults' ? true : false}
          ></Tabs>
        </div>
        <div className={styles.editPollTab}>
          <Tabs
            handleClick={EditPoll}
            text="Editar Encuestas"
            active={currentTab == 'EditPoll' ? true : false}
          ></Tabs>
        </div>
      </div>

      <div className={styles.pollContainer}>
        <div
          className={currentTab == 'Results' ? styles.results : styles.hidden}
        >
          <PollResults></PollResults>
        </div>
        <div
          className={
            currentTab == 'IndResults' ? styles.indResults : styles.hidden
          }
        >
          <PollResults></PollResults>
        </div>
        <div
          className={currentTab == 'EditPoll' ? styles.editPoll : styles.hidden}
        >
          <EditPolls></EditPolls>
        </div>
      </div>
    </div>
  );
};

// Add sidebar layout
Polls.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Encuestas">{page}</SidebarLayout>;
};

export default Polls;
