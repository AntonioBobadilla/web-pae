import cx from 'classnames';
import styles from '../css/components/dailybaritem.module.css';

const ItemDailyBar = (props) => {
  const handleClasses = () => {
    if (props.hasOwnProperty('active') === true) {
      return (
        <div className={cx(styles.item, styles.active)}>
          <p>{props.day}</p>
          <p>{props.number}</p>
        </div>
      );
    }
    if (props.hasOwnProperty('disabled') === true) {
      return (
        <div className={cx(styles.item, styles.disabled)}>
          <p>{props.day}</p>
          <p>{props.number}</p>
        </div>
      );
    }
    return (
      <div className={styles.item}>
        <p>{props.day}</p>
        <p>{props.number}</p>
      </div>
    );
  };

  return <>{handleClasses()}</>;
};

export default ItemDailyBar;
