import formatDate from '@/helpers/format-date';
import formatTime from '@/helpers/format-time';
import {
  selectAvailableTutorings,
  selectDate,
  selectFilteredMeetings,
  selectSelectedItem,
  setDate,
  setFilteredMeetings,
  setSelectedItem
} from '@/redux/schedule-tutoring';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'store/hook';
import AvailableStyles from '../../css/components/tutoring/availableTutorings.module.css';
import AvailableTutCard from '../available-tutorings-card';
import DailyBar from '../dailybar';
import DataTable from '../data-table/data-table';
import { AvailableTutoring } from '../data-table/types';

const initialState = {
  isOnline: false,
  hour: 0,
  tutor: '',
  period: 0
};
const AvailableTutorings = ({
  handleNextStep
}: {
  handleNextStep: () => void;
}) => {
  const meetings = useAppSelector(selectAvailableTutorings);

  // const [completed, setCompleted] = React.useState<boolean>(false);

  // const dispatch = useAppDispatch();
  const dispatch = useAppDispatch();

  // const [date, setDate] = React.useState<string>(meetings[0].date);
  const date = useAppSelector(selectDate);
  const filteredMeetings = useAppSelector(selectFilteredMeetings);

  const selectedItem = useAppSelector(selectSelectedItem);

  const changeDate = (newDate: string) => {
    dispatch(setDate(newDate));
  };

  const changeFilteredMeetings = (newFilteredMeetings: AvailableTutoring[]) => {
    const newFilteredMeetingsCopy = [...newFilteredMeetings];
    const sortedMeetings = newFilteredMeetingsCopy.sort((a, b) => {
      if (a.hour < b.hour) return -1;
      if (a.hour > b.hour) return 1;
      return 0;
    });
    dispatch(setFilteredMeetings(sortedMeetings));
  };
  // const [date, setDate] = React.useState<string>('');
  // const [filteredMeetings, setFilteredMeetings] = React.useState<
  //   AvailableTutoring[]
  // >([]);
  const changeSelectedItem = (newSelectedItem: AvailableTutoring) => {
    dispatch(setSelectedItem(newSelectedItem));
  };

  React.useEffect(() => {
    if (date === '') {
      changeFilteredMeetings([]);

      changeSelectedItem(initialState);
    } else {
      changeFilteredMeetings(
        meetings.filter((meeting) => meeting.date === date)[0].tutorings
      );
    }
  }, [date]);

  const nextStep = () => {
    // // dispatch
    // dispatch(setModalidad(selectedItem.col2));
    // dispatch(setTime(selectedItem.col1));
    // dispatch(saveDate(date));

    // completed
    // setCompleted(true);

    handleNextStep();
  };

  const changeDateDailyBar = (newDate: string) => {
    changeDate(newDate);
    changeSelectedItem(initialState);
  };

  return (
    <div className={AvailableStyles.page}>
      <div className={AvailableStyles.top}>
        <span className={AvailableStyles.title}>
          Elige el día que quieres tu asesoría
        </span>
        <div className={AvailableStyles.dailybar}>
          {meetings.length > 0 && (
            <DailyBar
              meetings={meetings}
              setSelectedDate={changeDateDailyBar}
              selectedDate={date}
            />
          )}
        </div>
      </div>

      <div className={AvailableStyles.bottom}>
        {date !== '' && filteredMeetings.length > 0 && (
          <div className={AvailableStyles.left}>
            <span className={AvailableStyles.date}>{formatDate(date)}</span>
            <div className={AvailableStyles.leftBottom}>
              <DataTable
                meetings={filteredMeetings}
                selectedItem={selectedItem}
                setSelectedItem={changeSelectedItem}
              />
            </div>
          </div>
        )}

        <div className={AvailableStyles.right}>
          <div className={AvailableStyles.container}>
            {selectedItem && selectedItem.period !== 0 && (
              <AvailableTutCard
                date={formatDate(date)}
                time={formatTime(selectedItem.hour)}
                location={selectedItem.isOnline ? 'Virtual' : 'Presencial'}
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
