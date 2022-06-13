/* eslint-disable jsx-a11y/interactive-supports-focus */
import classNames from 'classnames';
import React from 'react';
import Carousel from 'react-elastic-carousel';
import styles from '../css/components/dailybar.module.css';
import ItemDailyBar from './dailybar-item';
import { Meeting } from './data-table/types';
import { useTranslation } from 'next-i18next';  // add this


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
    // <button className={styles.arrowButton} onClick={onClick} disabled={isEdge}>
    //   {pointer}
    // </button>
  );
}

interface DailyBarProps {
  meetings: Meeting[];
  setSelectedDate: (date: string) => void;
  selectedDate: string;
}

const DailyBar = ({
  meetings,
  setSelectedDate,
  selectedDate
}: DailyBarProps) => {
  const { t } = useTranslation('student-schedule-tutoring'); // add this

  return (
  // const breakPoints = [
  //   { width: 500, itemsToShow:  },
  //   { width: 1200, itemsToShow: 5 }
  // ];

  <div className={styles.dailyBar}>
    <Carousel
      pagination={false}
      renderArrow={myArrow}
      // breakPoints={breakPoints}
      itemsToShow={5}
      isRTL={false}
      className={styles.carousel}
      itemsToScroll={5}
      // style={{wid}}
    >
      {meetings.map((meeting) => (
        <ItemDailyBar
          key={meeting.date}
          day={t(new Date(meeting.date).toLocaleDateString('es-MX', {
            weekday: 'long',
            timeZone: 'UTC'
          }))}
          number={new Date(meeting.date).toLocaleDateString('es-MX', {
            day: 'numeric',
            timeZone: 'UTC'
          })}
          active={selectedDate === meeting.date}
          onClick={() => setSelectedDate(meeting.date)}
          disabled={meeting.tutorings.length === 0}
        />
      ))}
    </Carousel>
  </div>
)};
export default DailyBar;
