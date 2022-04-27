import { ReactChild, ReactFragment, ReactPortal } from 'react';
import ButtonTemplateStyles from '../css/components/buttonTemplate.module.css';

const ButtonTemplate = (props: { text: string }) => {
  // creo un Stateless Functional Component

  return (
    <button className={ButtonTemplateStyles.primaryButton}>{props.text}</button>
  );
};

export default ButtonTemplate; // exporto la función
