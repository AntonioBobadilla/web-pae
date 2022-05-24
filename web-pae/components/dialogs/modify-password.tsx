import React from 'react';
import styles from '../../css/components/dialogs/modify-password.module.css';
import ButtonTemplate from '../button-template';
import ClosablePopup from '../closable-popup';

const ModifyPassword = () => (
  <ClosablePopup title="Registro" line visible style={styles.container}>
    <ButtonTemplate variant="cancel" clickable={false}>
      Cancelar
    </ButtonTemplate>
  </ClosablePopup>
);

export default ModifyPassword;
