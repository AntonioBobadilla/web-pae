import cx from 'classnames';
import { useEffect, useState } from 'react';
import styles from '../css/components/searchBar.module.css';

const SearchBar = (props) =>{

  const [suggestions, setSuggestions] = useState([])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    setSuggestions(props.suggestions)
  },[suggestions])


 const handleInput = (e) => {
     let value = e.target.value;
     setInputValue(value);
 } 

return (
  <div>
    <div className={styles.searchBarInputWrapper}>
      <i className={cx('bi bi-search', styles.icon)} />
      <input
        onChange={handleInput}
        type="text"
        className={styles.inputSearch}
        placeholder="Busca una unidad de formación (Clave / Nombre)"
      />
    </div>
    {
      suggestions
      .filter(materia => materia.indexOf(inputValue))
      .map( (v,i) => { return ( <p key={i}>{suggestions[i]}</p> ) } )
    }
  </div>
  
)};

export default SearchBar;
