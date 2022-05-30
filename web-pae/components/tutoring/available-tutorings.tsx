import React from 'react';
import AvailableStyles from '../../css/components/tutoring/availableTutorings.module.css';
import { MeetingsMockService } from '../../helpers/mock-service';
import AvailableTutCard from '../available-tutorings-card';
import DailyBar from '../dailybar';
import DataTable from '../data-table/data-table';
import { Meeting } from '../data-table/types';

const initialState = {
  col1: '',
  col2: ''
};
const AvailableTutorings = ({
  handleNextStep
}: {
  handleNextStep: () => void;
}) => {
  const [meetings, setMeetings] = React.useState<Meeting[]>(
    MeetingsMockService()
  );

  // const [completed, setCompleted] = React.useState<boolean>(false);

  // const dispatch = useAppDispatch();

  // const [date, setDate] = React.useState<string>(meetings[0].date);
  const [date, setDate] = React.useState<string>('');
  const [filteredMeetings, setFilteredMeetings] = React.useState<Meeting[]>([]);
  const [selectedItem, setSelectedItem] = React.useState(initialState);

  React.useEffect(() => {
    setFilteredMeetings(meetings.filter((meeting) => meeting.date === date));
    setSelectedItem(initialState);
  }, [meetings, date]);

  const nextStep = () => {
    // // dispatch
    // dispatch(setModalidad(selectedItem.col2));
    // dispatch(setTime(selectedItem.col1));
    // dispatch(saveDate(date));

    // completed
    // setCompleted(true);

    handleNextStep();
  };

  return (
    <div className={AvailableStyles.page}>
      <div className={AvailableStyles.top}>
        <span className={AvailableStyles.title}>
          Elige el día que quieres tu asesoría
        </span>
        <div className={AvailableStyles.dailybar}>
          <DailyBar
            meetings={meetings}
            setSelectedDate={setDate}
            selectedDate={date}
          />
        </div>
      </div>

      <div className={AvailableStyles.bottom}>
        {date !== '' && (
          <div className={AvailableStyles.left}>
            <span className={AvailableStyles.date}>
              {new Date(date).toLocaleDateString('es-MX', {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
              })}
            </span>
            <div className={AvailableStyles.leftBottom}>
              <DataTable
                meetings={filteredMeetings}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />
            </div>
          </div>
        )}

        <div className={AvailableStyles.right}>
          <div className={AvailableStyles.container}>
            {selectedItem !== initialState && (
              <AvailableTutCard
                date={new Date(date).toLocaleDateString('es-MX', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long'
                })}
                time={selectedItem.col1}
                location={selectedItem.col2}
                nextStep={nextStep}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableTutorings;
