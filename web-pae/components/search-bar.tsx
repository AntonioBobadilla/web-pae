/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import cx from 'classnames';
import Lexer from 'helpers/lexer';
import React, { useState } from 'react';
import styles from '../css/components/searchBar.module.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next'; 

export type Subject = {
  name: string;
  code: string;
  semester: number;
};

type SearchBarProps = {
  suggestions: Subject[];
  handleSuggestions: (subject: Subject) => void;
};

const SearchBar = ({ suggestions, handleSuggestions }: SearchBarProps) => {
  const [active, setActive] = useState(0);
  const [filtered, setFiltered] = useState<Subject[]>([]);
  const [isShow, setIsShow] = useState(false);
  const [input, setInput] = useState('');

  const onChange = (e: any) => {
    const inputText = e.currentTarget.value;
    let newFilteredSuggestions = suggestions.filter(
      ({ name }) => name.toLowerCase().indexOf(inputText.toLowerCase()) > -1
    );
    if (newFilteredSuggestions.length === 0) {
      newFilteredSuggestions = suggestions.filter(
        ({ code }) => code.toLowerCase().indexOf(inputText.toLowerCase()) > -1
      );
    }
    setActive(0);
    setFiltered(newFilteredSuggestions);
    setIsShow(true);
    setInput(e.currentTarget.value);
  };
  const onClick = (subject: Subject) => {
    setActive(0);
    setFiltered([]);
    setIsShow(false);
    // setInput(e.currentTarget.innerText);
    handleSuggestions(subject);
  };
  const onKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      // enter key
      setActive(0);
      setIsShow(false);
      if (filtered.length > 0) {
        setInput(filtered[active].name);
      }
    } else if (e.keyCode === 38) {
      // up arrow
      return active === 0 ? null : setActive(active - 1);
    } else if (e.keyCode === 40) {
      // down arrow
      return active - 1 === filtered.length ? null : setActive(active + 1);
    }
  };

  const renderSuggestion = (suggestion: string) => {
    const queries = input.split(' ');
    if (queries.includes('')) queries.pop();
    try {
      const lexer = new Lexer([
        [
          new RegExp(`(${queries.join('|').toUpperCase()})`),
          'match-suggestion'
        ],
        [/[0-9a-zA-Z_$][0-9a-zA-Z_$]*/, 'match'],
        [/(\s|'|"|°|-|\/)/, 'space-match']
      ]);
      const matches = lexer.lex(suggestion);
      // console.log(matches, suggestion);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return matches.map((match: any, index: number) => (
        <span key={index} className={match.type}>
          {match.value === ' ' ? '\u00A0' : match.value}
        </span>
      ));
    } catch (e) {
      return <span> {suggestion}</span>;
    }
  };
  const renderAutocomplete = () => {
    if (isShow && input) {
      if (filtered.length) {
        return (
          <ul className={styles.autocomplete}>
            {filtered.map((subject, index) => {
              let className;
              if (index === active) {
                className = 'styles.active';
              }
              return (
                <li
                  className={styles.className}
                  key={`${subject.name}${subject.code}${index.toString()}`}
                  onClick={() => onClick(subject)}
                >
                  {renderSuggestion(`${subject.code} ${subject.name}`)}
                </li>
              );
            })}
          </ul>
        );
      }
      return (
        <div className={styles.no_autocomplete}>
          <em>Not found</em>
        </div>
      );
    }
    return null;
  };
  const { t } = useTranslation('tutor-registration');

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBarInputWrapper}>
        <i className={cx('bi bi-search', styles.icon)} />
        <input
          type="text"
          className={styles.inputSearch}
          placeholder={t('Search a formation unit (Code/Name)')} 
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={input}
        />
      </div>
      {renderAutocomplete()}
    </div>
  );
};

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['tutor-registration']))
    }
  };
}
export default SearchBar;
