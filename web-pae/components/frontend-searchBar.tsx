import styles from '../css/components/searchBar.module.css';
import cx from 'classnames'

const SearchBar = () => {

    return (
            <div className={styles.searchBarInputWrapper}>
            <i className={cx('bi bi-search',styles.icon)}></i>
                <input type="text" className={styles.inputSearch} placeholder="Busca una unidad de formación (Clave / Nombre)" />
            </div>
    );

};

export default SearchBar;