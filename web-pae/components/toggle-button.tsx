import React, { useState } from 'react';
import toggleButtonStyles from '../css/components/toggleButton.module.css';

const ToggleButton = (props: { flagType: string; desc: string }) => {
  const { flagType } = props;
  const { desc } = props;
  return (
    <div className={toggleButtonStyles.toggle}>
      <img className={toggleButtonStyles.flag} src={props.flagType} />
      <p className={toggleButtonStyles.description}> {props.desc} </p>
    </div>
  );
};

export default ToggleButton;
