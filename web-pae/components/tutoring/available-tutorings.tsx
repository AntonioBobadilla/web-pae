import React from 'react';
import { MeetingsMockService } from '../../helpers/mock-service';
import DailyBar from '../dailybar';
import DataTable from '../data-table/data-table';
import { Meeting } from '../data-table/types';

const AvailableTutorings = () => {
  const [meetings, setMeetings] = React.useState<Meeting[]>(
    MeetingsMockService()
  );
  return (
    <div>
      <DailyBar />
      <DataTable meetings={meetings} />
    </div>
  );
};

export default AvailableTutorings;
