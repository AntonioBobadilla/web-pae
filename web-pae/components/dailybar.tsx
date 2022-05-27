/* eslint-disable jsx-a11y/interactive-supports-focus */
import classNames from 'classnames';
import React from 'react';
import Carousel, { consts } from 'react-elastic-carousel';
import styles from '../css/components/dailybar.module.css';
import ItemDailyBar from './dailybar-item';

function myArrow({ type, onClick, isEdge }) {
  const pointer = type === consts.PREV ? 'left' : 'right';
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

const DailyBar = () => (
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
      <ItemDailyBar day="Lunes" number="23" active />
      <ItemDailyBar day="Martes" number="24" />
      <ItemDailyBar day="Miercoles" number="25" disabled />
      <ItemDailyBar day="Jueves" number="26" />
      <ItemDailyBar day="Viernes" number="27" />
      <ItemDailyBar day="Sábado" number="28" disabled />
      <ItemDailyBar day="Domingo" number="29" />
      <ItemDailyBar day="Lunes" number="30" />
      <ItemDailyBar day="Martes" number="28" disabled />
      <ItemDailyBar day="Viernes" number="29" />
    </Carousel>
  </div>
);
export default DailyBar;
