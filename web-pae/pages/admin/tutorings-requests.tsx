import type { NextPage } from 'next';
import React, { ReactElement, useEffect, useState } from 'react';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import tutorintstyles from '@/css-components/tutoring-requests.module.css';
import styles from '@/css-admin/tutees.module.css';
import cx from 'classnames';
import Modalidad from '@/components/dialogs/edit-modalidad';
import SeleccionarAsesor from '@/components/dialogs/editar-asesor';
import SuccessAcceptTutoring from '@/components/dialogs/accept-tutoring';
import DeniedTutoring from '@/components/dialogs/denied-tutoring';
const Tutorings: NextPage = () => {

  const [data, setData] = useState([]);
  const [currentTab, setCurrentTab] = useState('');
  const [EditModalidad, setModalidad] = useState(false);
  const [Asesor, setAsesor] = useState(false);
  const [newAsesor, setNewAsesor] = useState('');
  const [objectToModify, setObjectToModify] = useState(0);
  const [objectModalidad, setObjectModalidad] = useState([]);
  const [newPlace, setNewPlace] = useState('');
  const [NewModalidad, setNewModalidad] = useState('');
  const [SuccessAcceptTutoringVisible, setSuccessAcceptTutoringVisible] = useState(false);
  const [DeniedTutoringVisible, setDeniedTutoringVisible] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [TuteeIdToDelete, setTuteeIdToDelete] = useState(0);
  const [pending, setPending] = useState(true);

  const getDataFromApi = () => {
    fetch('http://server-pae.azurewebsites.net/tutoring/?status=PE')
    .then((resp) => resp.json())
    .then(function(data) {
      setData(data);
      setPending(false);
      })
    .catch(function(error) {
      console.log(error);
    });
  } 

  const onClickSuccessAcceptTutoring = () => {
    setSuccessAcceptTutoringVisible(true);
  };


  const onClickDeniedTutoring = () => {
    setDeniedTutoringVisible(true);
  };

  const onClickModalidad = () => {
    setModalidad(true);
  };

  const onClickEditAsesor = () => {
    setAsesor(true);
  };
  // función que realizara el update del tutor basado en el indice guardado en objectToModify
  const updateAsesor = () => {
      if (newAsesor == '')
        return; 
    /*fetch('http://server-pae.azurewebsites.net/changetutoringlocation/'+newAsesor, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "is_online": online,
        "place": newPlace
    }) // agregar json de update
  })
    .then(res => {
      if (!res.ok) { // error coming back from server
        throw Error('could not make PUT request for that endpoint');
      } 
      return res.json();
    })
    .then(data => {
      console.log('ok')
      window.location.reload(false);
    })
    .catch(err => {
        console.log(err.message);
    })*/
    console.log('actualizando tutor.... desde func' )
  }

    // función que realizara el update del tutor basado en el indice guardado en objectToModify
    const updatemodalidad = () => {
      let online = NewModalidad == "En línea" ? true : false
      if (objectToModify == 0)
        return;
      fetch('http://server-pae.azurewebsites.net/changetutoringlocation/'+objectToModify, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "is_online": online,
          "place": newPlace
      }) // agregar json de update
    })
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw Error('could not make PUT request for that endpoint');
        } 
        return res.json();
      })
      .then(data => {
        console.log('ok')
        window.location.reload(false);
      })
      .catch(err => {
          console.log(err.message);
      })
    }

  const updateModalidad = () => {
    updatemodalidad();
  }

  useEffect(() => {
    if (confirmDelete == true)
      del();
},[confirmDelete]) // <-- here put the parameter to listen

  useEffect(() => {
    getDataFromApi()
  }, []);


  useEffect(() => {
    updateAsesor()
  }, [newAsesor]);

  useEffect(() => {
    updateModalidad();
  }, [NewModalidad]);

  const editModalidad = (modalidadObj, idABorrar) => {
    setObjectToModify(idABorrar) // ese es el indice que guardaremos
    setObjectModalidad(modalidadObj);
    onClickModalidad();
  }
// en esta funcion  vamos a recibir el indice del objeto del arreglo de objetos traidos por api
// para así al actualizar ese objeto nos basemos en su indice para saber qué objeto actualizar
  const EditAsesor = (idOfObject) => {
    setObjectToModify(idOfObject) // ese es el indice que guardaremos
    onClickEditAsesor();
  }

  const del = () => {
    fetch('http://server-pae.azurewebsites.net/tutoring/'+TuteeIdToDelete, {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
         'Authorization':'Token 5a752191e75533eaee3cfa008463ada6f343aea8'
      }
  })
    .then(res => {
      if (!res.ok) { // error coming back from server
        throw Error('could not make POST request for that endpoint');
      } else if (res.status === 204) {
        window.location.reload(false);
      }
      return res.json();
    })
    .catch(err => {
        console.log(err.message);
    })
  }

  const deleteTutoring = (id) => {
    setTuteeIdToDelete(id);
    onClickDeniedTutoring()
  }

  const acceptTutoring = (id) => {
    fetch('http://server-pae.azurewebsites.net/confirmtutoring/'+id, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
  })
    .then(res => {
      if (!res.ok) { // error coming back from server
        throw Error('could not make PUT request for that endpoint');
      } 
      return res.json();
    })
    .then(data => {
      console.log('ok')
      onClickSuccessAcceptTutoring()
      setTimeout(() => {
        window.location.reload(false);
      },3000)

    })
    .catch(err => {
        console.log(err.message);
    })
  }

  const renderTable = () => {
    if (data.length != 0){
      return (
          <table
          className={styles.tableRequest}
          >
        <thead>
          <tr className={cx(styles.headRow, styles.tr)}>
            <th className={styles.head}>Alumno solicitante</th>
            <th className={styles.head}>Asesor sugerido</th>
            <th className={styles.head}>UF solicitada</th>
            <th className={styles.head}>Horario</th>
            <th className={styles.head}>Modalidad</th>
            <th className={styles.head}></th>
          </tr>
        </thead>
        <tbody> 
          {
            data.map(function(item,index) {
              let {student} = item
              let modalidad = item.is_online ? 'En línea' : 'Presencial';
              return ( 
              <tr key={index}  className={styles.tr}>
                <td className={styles.td}>
                  <p className={tutorintstyles.name}>{student.name} </p>
                  <p className={tutorintstyles.apellidos}></p>
                  <div className={tutorintstyles.data}>
                    <p className={tutorintstyles.major}>{student.major}</p>
                    <p className={tutorintstyles.matricula}>{student.registration_number}</p>
                  </div>
                </td>
                <td className={styles.td}>
                  <p className={tutorintstyles.name}></p>
                  <p className={tutorintstyles.apellidos}></p>
                  <div className={tutorintstyles.data}>
                    <p className={tutorintstyles.major}></p>
                    <p className={tutorintstyles.matricula}></p>
                    <button className={tutorintstyles.button}  onClick={() => EditAsesor(item.id)}>
                      <i className= {cx( tutorintstyles.button,"bi bi-pencil")}></i>
                    </button>
                    
                  </div>
                </td>
                <td className={styles.td}>
                  <p className={tutorintstyles.subject}> </p>
                  <p className={tutorintstyles.subjectfull}></p>
                </td>
                <td className={styles.td}>
                  <p className={tutorintstyles.fullday}>{item.date}</p>
                  <p className={tutorintstyles.hora}>{item.hour}</p>
                </td>
                <td className={styles.td}>
                    <p className={tutorintstyles.item}>{modalidad}</p>
                    <p className={tutorintstyles.item}>{item.place}</p>
                    <button className={tutorintstyles.button} onClick={() => editModalidad({ forma: modalidad,lugar: item.place}, item.id)}>
                      <i className= {cx( tutorintstyles.button,"bi bi-pencil")}></i>
                    </button>

                </td>
                <td className={styles.td}>
                  <div className={styles.flex}>
                    <button  onClick={() => acceptTutoring(item.id)} className={styles.accept}>Aceptar asesoría</button>
                    <button  onClick={() => deleteTutoring(item.id)} className={styles.denied}>Rechazar asesoría</button>
                  </div>
                </td>
              </tr>
            )}) 
          }
        </tbody>
          </table>
      )
    } else if (data.length == 0 && pending == false){
      return (
        <div>
          <table
          className={styles.tableRequest}
          >
        <thead>
          <tr className={cx(styles.headRow, styles.tr)}>
            <th className={styles.head}>Alumno solicitante</th>
            <th className={styles.head}>Asesor sugerido</th>
            <th className={styles.head}>UF solicitada</th>
            <th className={styles.head}>Horario</th>
            <th className={styles.head}>Modalidad</th>
            <th className={styles.head}></th>
          </tr>
        </thead>
        <tbody> 
        </tbody>
        </table>
        <p className={tutorintstyles.emptyMessage}>No hay solicitudes disponibles</p> 
       </div>   
         )
    }
  }

  return (
    <div className={tutorintstyles.main}>
      <button className={tutorintstyles.Mainbutton}>Asesorías solicitadas</button>
        { renderTable() }

        { pending && <div>Cargando datos...</div> }

        {EditModalidad && (
            <Modalidad
              visible={EditModalidad}
              setVisible={setModalidad}
              modalidad={objectModalidad}
              setNewModalidad={setNewModalidad}
              setNewPlace={setNewPlace}
            />
      )}
      {SuccessAcceptTutoringVisible && (
            <SuccessAcceptTutoring
              visible={SuccessAcceptTutoringVisible}
              setVisible={setSuccessAcceptTutoringVisible}
            />
      )}
      {DeniedTutoringVisible && (
            <DeniedTutoring
              visible={DeniedTutoringVisible}
              setVisible={setDeniedTutoringVisible}
              setConfirmDelete={setConfirmDelete}
            />
      )}
        {Asesor && (
            <SeleccionarAsesor
              visible={Asesor}
              setVisible={setAsesor}
              setAsesor={setNewAsesor}
            />
      )}
    </div>
    
  )
};

// Add sidebar layout
Tutorings.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Solicitudes de asesorías">{page}</SidebarLayout>;
};

export default Tutorings;
