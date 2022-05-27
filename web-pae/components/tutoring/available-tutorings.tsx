import React from 'react';
import { MeetingsMockService } from '../../helpers/mock-service';
import DailyBar from '../dailybar';
import DataTable from '../data-table/data-table';
import { Meeting } from '../data-table/types';
import AvailableStyles from '../../css/components/tutoring/availableTutorings.module.css';
import AvailableTutCard from '../available-tutorings-card';
import { access } from 'fs';

const AvailableTutorings = () => {
  const [meetings, setMeetings] = React.useState<Meeting[]>(
    MeetingsMockService()
  );
  return (
    <div className={AvailableStyles.page}>
      <div className={AvailableStyles.top}>
        <span className={AvailableStyles.title}>
          Elige el día que quieres tu asesoría
        </span>
        <div className={AvailableStyles.dailybar}>
          <DailyBar />
        </div>
      </div>

      <div className={AvailableStyles.bottom}>
        <div className={AvailableStyles.left}>
          <span className={AvailableStyles.date}> Viernes 18 de Marzo </span>
          <div className={AvailableStyles.leftBottom}>
            <DataTable meetings={meetings} />
          </div>
        </div>

        <div className={AvailableStyles.right}>
          <div className={AvailableStyles.container}>
            <AvailableTutCard
              date="Viernes 18 de Marzo"
              time="12:00 pm"
              location="Virtual"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableTutorings;

/*<div className={AvailableStyles.dailybar}>
<DailyBar />
</div>

<div className={AvailableStyles.leftTop}>
            <div className={AvailableStyles.dailybar}>
              <DailyBar />
            </div>
          </div>
*/
