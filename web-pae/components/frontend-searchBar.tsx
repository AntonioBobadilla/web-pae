import React, { useState } from "react";
import cx from 'classnames';
import styles from '../css/components/searchBar.module.css';

const SearchBar = (props) => {

  const [active, setActive] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [input, setInput] = useState("");
  
  const onChange = e => {
    const { suggestions } = props;
    const input = e.currentTarget.value;
    const newFilteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(input.toLowerCase()) > -1
    );
    setActive(0);
    setFiltered(newFilteredSuggestions);
    setIsShow(true);
    setInput(e.currentTarget.value)
  };
const onClick = e => {
    setActive(0);
    setFiltered([]);
    setIsShow(false);
    setInput(e.currentTarget.innerText)
  };
const onKeyDown = e => {
    if (e.keyCode === 13) { // enter key
      setActive(0);
      setIsShow(false);
      setInput(filtered[active])
    }
    else if (e.keyCode === 38) { // up arrow
      return (active === 0) ? null : setActive(active - 1);
    }
    else if (e.keyCode === 40) { // down arrow
      return (active - 1 === filtered.length) ? null : setActive(active + 1);
    }
  };
const renderAutocomplete = () => {
    if (isShow && input) {
      if (filtered.length) {
        return (
          <ul className={styles.autocomplete}>
            {filtered.map((suggestion, index) => {
              let className;
              if (index === active) {
                className = "styles.active";
              }
              return (
                <li className={styles.className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        return (
          <div className={styles.no_autocomplete}>
            <em>Not found</em>
          </div>
        );
      }
    }
    return <></>;
  }

  return ( 
    <div className={styles.wrapper}>
      <div className={styles.searchBarInputWrapper}>
        <i className={cx('bi bi-search', styles.icon)} />
        <input
          type="text"
          className={styles.inputSearch}
          placeholder="Busca una unidad de formación (Clave / Nombre)"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={input}
        />
      </div>
      {renderAutocomplete()}
    </div>
    );
};


 

export default SearchBar;
