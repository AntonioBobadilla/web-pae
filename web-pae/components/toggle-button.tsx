import React from 'react';
import toggleButtonStyles from '../css/components/toggleButton.module.css';
import { useState } from 'react';

const ToggleButton = (props: { flagType: string; desc: string }) => {
  const { flagType } = props;
  const { desc } = props;
  const [isToggled, setIsToggled] = useState(false);
  const buttonLanguage = () => {
    setIsToggled(!isToggled);
  };
  return (
    <div className={toggleButtonStyles.toggle} onClick={buttonLanguage}>
      <img
        className={
          isToggled ? toggleButtonStyles.selected : toggleButtonStyles.flag
        }
        src={props.flagType}
      />
      <p className={toggleButtonStyles.description}> {props.desc} </p>
    </div>
  );
};

export default ToggleButton;
