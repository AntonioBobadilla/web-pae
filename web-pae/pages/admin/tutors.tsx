import type { NextPage } from 'next';
import React, { ReactElement, useEffect, useState } from 'react';
import SidebarLayout from '../../components/layouts/sidebar-layout';
import styles from '@/css-admin/tutees.module.css';
import cx from 'classnames';
import Tabs from '@/components/tabs';
import SearchBar from '@/components/search-bar';
import useFetch from '@/hooks/useFetch';
import { stringify } from 'querystring';
import SuccessAcceptTutee from '@/components/dialogs/accept-tutee';
import DeniedTutee from '@/components/dialogs/denied-tutee';

const Tutorings: NextPage = () => {

  const [asesores, setAsesores] = useState([]);
  const [solicitudesAsesores, setSolicitudesAsesores] = useState([]);
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [successAcceptTuteeVisible, setsuccessAcceptTuteeVisible] = useState(false);
  const [DeniedTuteeVisible, setdeniedTuteeVisible] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [TuteeIdToDelete, setTuteeIdToDelete] = useState(0);
  const [pending, setPending] = useState(true);
  const removeDuplicates = (arr) => {
    return arr.filter((item,
      index) => arr.indexOf(item) === index);
  }

  useEffect(() => {
    if (confirmDelete == true)
      del();
},[confirmDelete]) // <-- here put the parameter to listen

  const onClickSuccessAcceptTutee = () => {
    setsuccessAcceptTuteeVisible(true);
  };

  const onClickDeniedTutee = () => {
    setdeniedTuteeVisible(true);
  };

  const filterData = () => {
    console.log(flag)
    if (data != [] ){
      data.forEach(item => {
        if (item.is_accepted) {
          setAsesores(asesores => [...asesores, item]);
        } else {
          setSolicitudesAsesores(solicitudesAsesores => [...solicitudesAsesores, item])
        }
      });
      console.log(flag)
      setFlag(true)
    } 
  }

  const getTuteesFromApi = () => {
    fetch('http://server-pae.azurewebsites.net/tutor/')
    .then((resp) => resp.json())
    .then(function(data) {
      setPending(false);
      setData(data);
      })
    .catch(function(error) {
      console.log(error);
    });
  } 



  const createDataArray = () => {
    //console.log(solicitudesAsesores);
  } 

  const [currentTab, setCurrentTab] = useState('');

  useEffect(() => {
    filterData();

  }, [data]);

  useEffect(() => {
    getTuteesFromApi()
    setCurrentTab('tutors');
    //createDataArray();
  }, []);



  const tutorsButton = () => {
    setCurrentTab('tutors');
  };

  const requestButton = () => {
    setCurrentTab('request');
  };

  const acceptTutee = (id) => {
    fetch('http://server-pae.azurewebsites.net/tutorisaccepted/'+id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({"is_accepted": true})
  })
    .then(res => {
      if (!res.ok) { // error coming back from server
        throw Error('could not make PUT request for that endpoint');
      } 
      return res.json();
    })
    .then(data => {
      console.log('ok')
      onClickSuccessAcceptTutee()
      window.location.reload(false);
    })
    .catch(err => {
        console.log(err.message);
    })
    
  }

  const deleteTutee = (id) => {
    setTuteeIdToDelete(id);
    onClickDeniedTutee()
  }


  const del = () => {
    fetch('http://server-pae.azurewebsites.net/tutor/'+TuteeIdToDelete, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
  })
    .then(res => {
      if (!res.ok) { // error coming back from server
        throw Error('could not make POST request for that endpoint');
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

  const renderAsesores = () => {
    if (asesores.length != 0) { 
      console.log(asesores)
      return (
      <table
          className={
            currentTab == 'tutors' ? styles.tableTutors : styles.hidden
          }
        >
          <thead>
            <tr className={cx(styles.headRow, styles.tr)}>
              <th className={styles.head}>Matricula</th>
              <th className={styles.head}>Nombre</th>
              <th className={styles.head}>Carrera</th>
              <th className={styles.head}>Materias de asesoría</th>
              <th className={styles.head}>Número de horas</th>
              <th className={styles.head}>Horarios</th>
              <th className={styles.head}></th>
            </tr>
          </thead>
          <tbody>
     { asesores.map(function (item,index) {
      return (
        <tr  key={index} className={styles.tr}>
          <td className={styles.td}>
            <p>{item.registration_number}</p>
          </td>
          <td className={styles.td}>
            <p>{item.name}</p>
          </td>
          <td className={styles.td}>
            <p>ITC</p>
          </td>
          <td className={styles.td}>
            {
              item.subjects.map( function(subject, index) {
                return ( <p key={index}>{subject.subject} </p> )
              })  
            }
          </td>
          <td className={styles.td}>
            <p>{item.completed_hours}/80</p>
          </td>
          <td className={styles.td}>
            <button className={styles.button}>Ver</button>
          </td>
          <td className={styles.td}>
            <i className="bi bi-pencil"></i>
          </td>
        </tr>
          );
        })} 
        </tbody>
        </table> 
      )  
    } else {
      return (
        <div className={
          currentTab == 'request' ? styles.tableRequest : styles.hidden
        }>
        <table

      >
      <thead>
        <tr className={cx(styles.headRow, styles.tr)}>
              <th className={styles.head}>Matricula</th>
              <th className={styles.head}>Nombre</th>
              <th className={styles.head}>Carrera</th>
              <th className={styles.head}>Materias de asesoría</th>
              <th className={styles.head}>Número de horas</th>
              <th className={styles.head}>Horarios</th>
              <th className={styles.head}></th>
        </tr>
      </thead>
      <tbody> 
      </tbody>
      </table>
      <p className={styles.emptyMessage}>No hay asesores disponibles</p>    
      </div>  
      )
    }
  }

  const renderSolicitudesAsesores = () => {
    if (solicitudesAsesores.length != 0) { 
      return (
        <table
          className={
            currentTab == 'request' ? styles.tableRequest : styles.hidden
          }
        >
        <thead>
          <tr className={cx(styles.headRow, styles.tr)}>
            <th className={styles.head}>Matricula</th>
            <th className={styles.head}>Nombre</th>
            <th className={styles.head}>Carrera</th>
            <th className={styles.head}>Materias de asesoría</th>
            <th className={styles.head}>Horarios</th>
            <th className={styles.head}>Aceptar/rechazar</th>
          </tr>
        </thead>
        <tbody>
         { solicitudesAsesores.map(function (item,index) {
          return (
            <tr  key={index} className={styles.tr}>
              <td className={styles.td}>
                <p>{item.registration_number}</p>
              </td>
              <td className={styles.td}>
                <p>{item.name}</p>
              </td>
              <td className={styles.td}>
                <p>ITC</p>
              </td>
              <td className={styles.td}>
              {
              item.subjects.map( function(subject, index) {
                return ( <p key={index}>{subject.subject} </p> )
              })  
            }
              </td>
              <td className={styles.td}>
                <button className={styles.button}>Ver</button>
              </td>
              <td className={styles.td}>
                <div className={styles.flex}>
                  <button onClick={() => acceptTutee(item.registration_number)} className={styles.accept}>Aceptar</button>
                  <button onClick={() => deleteTutee(item.registration_number)} className={styles.denied}>Rechazar</button>
                </div>
              </td>
            </tr>
          );
        })}
        </tbody>
        </table> 
      )  
    } else {
      return (
        <div className={
          currentTab == 'request' ? styles.tableRequest : styles.hidden
        }>
        <table

      >
      <thead>
        <tr className={cx(styles.headRow, styles.tr)}>
          <th className={styles.head}>Matricula</th>
          <th className={styles.head}>Nombre</th>
          <th className={styles.head}>Carrera</th>
          <th className={styles.head}>Materias de asesoría</th>
          <th className={styles.head}>Horarios</th>
          <th className={styles.head}>Aceptar/rechazar</th>
        </tr>
      </thead>
      <tbody> 
      </tbody>
      </table>
      <p className={styles.emptyMessage}>No hay solicitudes disponibles</p>    
      </div>  
      )
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.searchBar}>
        <SearchBar suggestions={['a']}/>
      </div>
      <div className={styles.tabs}>
        <div className={styles.tutorTab}>
          <Tabs
            handleClick={tutorsButton}
            text="Mis Asesores"
            active={currentTab == 'tutors' ? true : false}
          ></Tabs>
        </div>
        <div className={styles.requestTab}>
          <Tabs
            handleClick={requestButton}
            text="Solicitudes"
            active={currentTab == 'request' ? true : false}
          ></Tabs>
        </div>
      </div>
      <div className={styles.tables}>
        
            { pending && <div>Cargando datos...</div> }
            { renderAsesores()  }
            

            {renderSolicitudesAsesores()}
      </div>
      {successAcceptTuteeVisible && (
            <SuccessAcceptTutee
              visible={successAcceptTuteeVisible}
              setVisible={setsuccessAcceptTuteeVisible}
            />
      )}
      {DeniedTuteeVisible && (
            <DeniedTutee
              visible={DeniedTuteeVisible}
              setVisible={setdeniedTuteeVisible}
              setConfirmDelete={setConfirmDelete}
            />
      )}
    </div>

  );
};

// Add sidebar layout
Tutorings.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="ASESORES PAE">{page}</SidebarLayout>;
};

export default Tutorings;
