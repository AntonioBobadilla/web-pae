import cx from 'classnames';
import React from 'react';
import styles from '../css/components/dailybaritem.module.css';

interface ItemDailyBarProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
}: ItemDailyBarProps) => (
  <div
    className={cx(
      disabled ? styles.disabled : styles.item,
      active && styles.active,
      day === 'Viernes' && styles.borderless
    )}
    onClick={disabled ? undefined : onClick}
  >
    <p style={{ textTransform: 'capitalize' }}>{day}</p>
    <p>{number}</p>
  </div>
);

ItemDailyBar.defaultProps = {
  active: false
};

export default ItemDailyBar;
