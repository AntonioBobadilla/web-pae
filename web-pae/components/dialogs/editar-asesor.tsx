import React, { useEffect, useState } from 'react';
import styles from '../../css/components/dialogs/modify-password.module.css';
import editAsesorStyles from '../../css/components/dialogs/edit-asesor.module.css';
import ButtonTemplate from '../button-template';
import ClosablePopup from '../closable-popup';
import ToggleButton from '../toggle-button';
import cx from 'classnames';

type ModifyLanguageProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void,
  setAsesor: any,
  day: any,
  hour: any,
  subject: any
};

const EditAsesor = ({ visible, setVisible, setAsesor, day, hour, subject }: ModifyLanguageProps) => {

  const [asesorActual, setAsesorActual] = useState<any>('');
  const [asesoresDisponibles, setAsesoresDisponibles] = useState<any>([]);
  const [pending, setPending] = useState<any>(true);

  const onClickSave = () => {
    setVisible(false);
  };


  const clearAllBorders = () => {
    let wrapper: any = document.querySelector('#wrapper');
    let asesores: any = wrapper.childNodes;
    asesores.forEach((item: { style: { border: string; }; classList: { remove: (arg0: string) => void; }; }) => {
      item.style.border = '1px solid #7a7a7a';
      item.classList.remove('active')
    })
  }

  const handleClickAsesor = (e: any) => {
    if (asesoresDisponibles.length != 0){
      let idOfAsesor = e.target.id;

      let asesorObj: any = asesoresDisponibles[idOfAsesor];
  
      let asesor = asesorObj.registration_number
      setAsesorActual(asesor)
      clearAllBorders();
      if (!e.target.classList.contains('active')){
        e.target.style.border = '2px solid #039BE5';
        e.target.classList.add('active')
      }
      setAsesorActual(asesor)
      console.log("Asesor seleccionado: ", asesor)
    }

  }

  const getAsesores = () => {
    fetch('http://server-pae.azurewebsites.net/alternatetutor/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "date": day,
        "hour": hour,
        "subject":subject
      })  
    })
    .then((resp) => resp.json())
    .then(function(data) {
      setAsesoresDisponibles(data);
      console.log("data: ",data)
      setPending(false);
      })
    .catch(function(error) {
      console.log(error);
    });
  }

  useEffect(() => {
    getAsesores()
  }, [])

  useEffect(() => {
    let wrapper = document.querySelector('#wrapper');
    if (wrapper != null ) {
      if (asesoresDisponibles.length != 0){
        let asesores = wrapper.childNodes;
        asesores.forEach(item => {
          item.addEventListener("click", handleClickAsesor);
        })
      }

    }

  },[asesoresDisponibles])
  
  const sendData = () => {
    setAsesor(asesorActual);
    onClickSave();
  }
  return (
    <ClosablePopup
      title="Otros asesores disponibles"
      line
      visible={visible}
      style={editAsesorStyles.container}
      setVisible={setVisible}
    >
      <div className={editAsesorStyles.wrapper}>
        <div id='wrapper' className={editAsesorStyles.asesores}>
          {pending && <div className={editAsesorStyles.message}>Cargando asesores....</div>}
          {asesoresDisponibles.length == 0 && !pending && <div className={editAsesorStyles.message}>No hay asesores disponibles para esta asesoria.</div>}
          { 
            asesoresDisponibles.map(function(item: any,index: any) {
              return ( 
              <div key={index} id={index} className={editAsesorStyles.asesor}>
                  <div  className={editAsesorStyles.asesor_izq}>
                      <p className={editAsesorStyles.name}>{ item.name } </p>
                      <p className={editAsesorStyles.apellidos}></p>
                      <div className={editAsesorStyles.flex}>
                          <p className={editAsesorStyles.carrera}>{ item.major }</p>
                          <p className={editAsesorStyles.matricula}>{ item.registration_number }</p>
                      </div>
                  </div>
                  <div className={editAsesorStyles.asesor_der}>
                      <p className={editAsesorStyles.textHoras}>Horas totales</p>
                      <p className={editAsesorStyles.horas}>{ item.completed_hours }</p>
                  </div>
              </div>
              )
            })}
        </div>
        <div className={editAsesorStyles.button}>
          <ButtonTemplate variant="confirm" onClick={sendData}>
                GUARDAR
          </ButtonTemplate>
      </div>
      </div>
    </ClosablePopup>
  );
};

export default EditAsesor;
