import cx from 'classnames';
import styles from '../css/components/iconText.module.css';

const TextIcon = () => (
  <div className={styles.iconWrapper}>
    <i className={cx('bi bi-apple', styles.icon)} />
    <p className={styles.text}>Lunes 21 de Marzo</p>
  </div>
);

export default TextIcon;
