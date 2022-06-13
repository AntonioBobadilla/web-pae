import EditPolls from '@/components/edit-polls';
import PollIndividualResults from '@/components/poll-individual-results';
import PollResults from '@/components/poll-results';
import Tabs from '@/components/tabs';
import { ReactElement, useEffect, useState } from 'react';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import styles from '../../css/admin/polls.module.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Polls = () => {
  const [currentTab, setCurrentTab] = useState('');
  const { t } = useTranslation('admin-polls');

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
  return (
    <div className={styles.main}>
      <div className={styles.tabs}>
        <div className={styles.resultsTab}>
          <Tabs
            handleClick={Results}
            text={t('Results')}
            active={currentTab == 'Results'}
          />
        </div>
        <div className={styles.indResultsTab}>
          <Tabs
            handleClick={IndResults}
            text={t('Individual results')}
            active={currentTab == 'IndResults'}
          />
        </div>
        <div className={styles.editPollTab}>
          <Tabs
            handleClick={EditPoll}
            text={t('Edit polls')}
            active={currentTab == 'EditPoll'}
          />
        </div>
      </div>

      <div className={styles.pollContainer}>
        <div
          className={currentTab == 'Results' ? styles.results : styles.hidden}
        >
          <PollResults curTab={currentTab == 'Results'} />
        </div>
        <div
          className={
            currentTab == 'IndResults' ? styles.indResults : styles.hidden
          }
        >
          <PollIndividualResults curTab={currentTab == 'IndResults'} />
        </div>
        <div
          className={currentTab == 'EditPoll' ? styles.editPoll : styles.hidden}
        >
          <EditPolls />
        </div>
      </div>
    </div>
  );
};

// Add sidebar layout
Polls.getLayout = function getLayout(page: ReactElement) {
  const { t } = useTranslation('admin-polls');
  return <SidebarLayout title={t('Polls')}>{page}</SidebarLayout>;
};

export async function getStaticProps({ locale }: { locale: any }) {

  //traductor pagina principal
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'admin-polls',
        'tutor-profile'
      ]))
    }
  };
}
export default Polls;
