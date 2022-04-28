import styles from '../css/components/iconText.module.css'
import cx from 'classnames'

const TextIcon = () => {
    return (
            <div className={styles.iconWrapper}>
                <i className={cx('bi bi-apple', styles.icon)}></i>
                <p className={styles.text}>Lunes 21 de Marzo</p>
            </div>
    )
};

export default TextIcon; 