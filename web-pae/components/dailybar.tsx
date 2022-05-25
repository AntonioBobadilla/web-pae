import Carousel, { consts } from 'react-elastic-carousel';
import styles from '../css/components/dailybar.module.css';
import ItemDailyBar from './dailybar-item';

function myArrow({ type, onClick, isEdge }) {
  const pointer = type === consts.PREV ? '<' : '>';
  return (
    <button className={styles.arrowButton} onClick={onClick} disabled={isEdge}>
      {pointer}
    </button>
  );
}

const DailyBar = () => {
  const breakPoints = [
    { width: 1, itemsToShow: 2 },
    { width: 550, itemsToShow: 3 },
    { width: 768, itemsToShow: 4 },
    { width: 1200, itemsToShow: 5 }
  ];

  return (
    <div className={styles.dailyBar}>
      <Carousel
        pagination={false}
        renderArrow={myArrow}
        breakPoints={breakPoints}
      >
        <ItemDailyBar day="Lunes" number="23" active>
          {' '}
        </ItemDailyBar>
        <ItemDailyBar day="Martes" number="24">
          {' '}
        </ItemDailyBar>
        <ItemDailyBar day="Miercoles" number="25" active>
          {' '}
        </ItemDailyBar>
        <ItemDailyBar day="Jueves" number="26">
          {' '}
        </ItemDailyBar>
        <ItemDailyBar day="Viernes" number="27">
          {' '}
        </ItemDailyBar>
        <ItemDailyBar day="Sábado" number="28" disabled>
          {' '}
        </ItemDailyBar>
        <ItemDailyBar day="Domingo" number="29">
          {' '}
        </ItemDailyBar>
        <ItemDailyBar day="Lunes" number="30">
          {' '}
        </ItemDailyBar>
      </Carousel>
    </div>
  );
};

export default DailyBar;
