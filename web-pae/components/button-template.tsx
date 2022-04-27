import {
  MouseEventHandler,
  ReactChild,
  ReactFragment,
  ReactPortal
} from 'react';
import ButtonTemplateStyles from '../css/components/ButtonTemplate.module.css';

const ButtonTemplate = (props: {
  onClickFunction: MouseEventHandler<HTMLButtonElement> | undefined;
  color: any | undefined;
  text: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined;
}) => {
  // creo un Stateless Functional Component

  return (
    <button
      className={ButtonTemplateStyles.primaryButton}
      onClick={props.onClickFunction}
      style={{ backgroundColor: props.color }}
    >
      {props.text}
    </button>
  );
};

export default ButtonTemplate; // exporto la función
