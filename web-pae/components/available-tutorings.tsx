import React from 'react';
import { MeetingsMockService } from '../helpers/mock-service';
import DataTable from './data-table/data-table';

const AvailableTutorings = () => {
  const [meetings, setMeetings] = React.useState<Meeting[]>(
    MeetingsMockService()
  );
  return <DataTable meetings={meetings} />;
};

export default AvailableTutorings;
