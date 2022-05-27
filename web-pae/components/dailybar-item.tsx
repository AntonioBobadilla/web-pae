import cx from 'classnames';
import React from 'react';
import styles from '../css/components/dailybaritem.module.css';

interface ItemDailyBarProps {
  disabled?: boolean;
  active?: boolean;
  day: string;
  number: string;
}

const ItemDailyBar = ({ disabled, active, day, number }: ItemDailyBarProps) => (
  <div
    className={cx(
      disabled ? styles.disabled : styles.item,
      active && styles.active,
      day === 'Viernes' && styles.borderless
    )}
  >
    <p>{day}</p>
    <p>{number}</p>
  </div>
);

ItemDailyBar.defaultProps = {
  disabled: false,
  active: false
};

export default ItemDailyBar;
