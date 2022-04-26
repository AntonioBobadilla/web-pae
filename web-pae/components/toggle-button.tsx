//Siempre se importa react
import React from 'react';
import toggleButtonStyles from '../css/components/toggleButton.module.css';
import { useState } from 'react';

const ToggleButton = () => {
  // creo un Stateless Functional Component
  const [isToggled, setIsToggled] = useState(false); //used to store the state of the toggle button

  const buttonLanguage = () => {
    setIsToggled(!isToggled);
    //console.log(isToggled);
  };
  return (
    // todo lo de return debe estar dentro de div o fragment y el className define la clase para ese contenedor
    <div className={toggleButtonStyles.toggle} onClick={buttonLanguage}>
      <img
        className={
          isToggled ? toggleButtonStyles.selected : toggleButtonStyles.flag
        } //terneario
        src="/images/mxflag.png"
      />
      <p className={toggleButtonStyles.description}> Español </p>
    </div>
  );
};

export default ToggleButton; // exporto la función

//<button className={toggleButtonStyles.icons}> Hola </button>
