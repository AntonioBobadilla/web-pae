import styles from '../css/components/dailybar.module.css'
import cx from 'classnames'
import Carousel, { consts }  from "react-elastic-carousel";
import ItemDailyBar from './frontend-dailybarItem';



function myArrow({ type, onClick, isEdge }) {
    const pointer = type === consts.PREV ? '<' : '>'
    return (
      <button className={styles.arrowButton} onClick={onClick} disabled={isEdge}>
        {pointer}
      </button>
    )
  }

const DailyBar = () => {

    const breakPoints = [
        { width: 1, itemsToShow: 2 },
        { width: 550, itemsToShow: 3 },
        { width: 768, itemsToShow: 4 },
        { width: 1200, itemsToShow: 5 },
    ];

    return (
        <div className={styles.dailyBar}>
            <Carousel pagination={false} renderArrow={myArrow} breakPoints={breakPoints}>
                <ItemDailyBar day={"Lunes"} number={"23"} active={true}> </ItemDailyBar>
                <ItemDailyBar day={"Martes"} number={"24"}> </ItemDailyBar>
                <ItemDailyBar day={"Miercoles"} number={"25"} active={true}> </ItemDailyBar>
                <ItemDailyBar day={"Jueves"} number={"26"}> </ItemDailyBar>
                <ItemDailyBar day={"Viernes"} number={"27"}> </ItemDailyBar>
                <ItemDailyBar day={"Sábado"} number={"28"} disabled={true}> </ItemDailyBar>
                <ItemDailyBar day={"Domingo"} number={"29"}> </ItemDailyBar>
                <ItemDailyBar day={"Lunes"} number={"30"}> </ItemDailyBar>
            </Carousel>
        </div>

    )
};

export default DailyBar; 