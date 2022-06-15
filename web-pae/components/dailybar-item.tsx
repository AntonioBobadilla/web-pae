import cx from 'classnames';
import React from 'react';
import styles from '../css/components/dailybaritem.module.css';

interface ItemDailyBarProps {
  disabled: boolean;
  onClick: () => void;
  active?: boolean;
  day: string;
  number: string;
}

const ItemDailyBar = ({
  disabled,
  active,
  day,
  number,
  onClick
}: ItemDailyBarProps) => {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <div
      className={cx(
        disabled ? styles.disabled : styles.item,
        active && styles.active
      )}
      onClick={() => handleClick()}
    >
      <p style={{ textTransform: 'capitalize' }}>{day}</p>
      <p>{number}</p>
    </div>
  );
};

ItemDailyBar.defaultProps = {
  active: false
};

export default ItemDailyBar;
