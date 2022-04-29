import cx from 'classnames';
import styles from '../css/components/searchBar.module.css';

const SearchBar = () => (
  <div className={styles.searchBarInputWrapper}>
    <i className={cx('bi bi-search', styles.icon)} />
    <input
      type="text"
      className={styles.inputSearch}
      placeholder="Busca una unidad de formación (Clave / Nombre)"
    />
  </div>
);

export default SearchBar;
