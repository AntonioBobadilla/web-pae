import React, { useState } from 'react';
import styles from '../../css/components/dialogs/modify-password.module.css';
import stylesModalidad from '../../css/components/dialogs/edit-modalidad.module.css';
import ButtonTemplate from '../button-template';
import ClosablePopup from '../closable-popup';
import { useTranslation } from 'next-i18next';

type ModifyLanguageProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  modalidad: any;
  setNewModalidad: any;
  setNewPlace: any;
};

const EditModalidad = ({
  visible,
  setVisible,
  modalidad,
  setNewModalidad,
  setNewPlace
}: ModifyLanguageProps) => {
    const { t } = useTranslation('admin-tutorings-requests');
    const [option, setOption] = useState<any>(modalidad.forma);
    const [place, setPlace] = useState<any>(modalidad.lugar);
  const onClickSave = () => {
    setVisible(false);
  };

  const changePlaceholder = (value: any) => {
    let input: any = document.querySelector('#input');
    if (value == 'En línea') {
      input.placeholder = 'ZOOM ID:';
    } else {
      input.placeholder = 'AULA:';
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setOption(value);
    changePlaceholder(value);
  };

  const handlePlace = (e: any) => {
    const { value } = e.target;
    setPlace(value);
  };

  const sendData = () => {
    setNewModalidad(option);
    setNewPlace(place);
    onClickSave();
  };

  return (
    <ClosablePopup
      title={t('Modality')}
      line
      visible={visible}
      style={stylesModalidad.container}
      setVisible={setVisible}
    >
      <div className={stylesModalidad.wrapper}>
        <div className={stylesModalidad.radioOptions}>
          <div className={stylesModalidad.radioOption}>
            <input
              id="enLinea"
              value="En línea"
              name="option"
              type="radio"
              onChange={handleChange}
              defaultChecked={modalidad.forma == 'En línea' ? true : false}
            />
            <p className={stylesModalidad.text}>{t('Online')}</p>
          </div>
          <div className={stylesModalidad.radioOption}>
            <input
              id="presencial"
              value="Presencial"
              name="option"
              type="radio"
              onChange={handleChange}
              defaultChecked={modalidad.forma == 'Presencial' ? true : false}
            />
            <p className={stylesModalidad.text}>{t('Face-to-face')}</p>
          </div>
        </div>
        <input
          onChange={handlePlace}
          id="input"
          value={place}
          className={stylesModalidad.inputText}
          type="text"
          placeholder="ZOOM ID:"
        />
        <div className={stylesModalidad.button}>
          <ButtonTemplate variant="confirm" onClick={sendData}>
            {t('SAVE')}
          </ButtonTemplate>
        </div>
      </div>
    </ClosablePopup>
  );
};

export default EditModalidad;
