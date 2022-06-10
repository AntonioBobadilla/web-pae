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
import Calendar from '@/components/dialogs/view-calendar-tutee';
import DeniedTutee from '@/components/dialogs/denied-tutee';

const Tutorings: NextPage = () => {

  const [asesores, setAsesores] = useState<any>([]);
  const [solicitudesAsesores, setSolicitudesAsesores] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [flag, setFlag] = useState<any>(false);
  const [successAcceptTuteeVisible, setsuccessAcceptTuteeVisible] = useState<any>(false);
  const [DeniedTuteeVisible, setdeniedTuteeVisible] = useState<any>(false);
  const [confirmDelete, setConfirmDelete] = useState<any>(false);
  const [TuteeIdToDelete, setTuteeIdToDelete] = useState<any>(0);
  const [pending, setPending] = useState<any>(true);
  const [ViewCalendar, setviewCalendar] = useState<any>(false);
  const [schedules, setSchedules] = useState<any>([])
  const [TutorName, setTutorName] = useState<any>([])
  const [inputSearch, setInputSearch] = useState<any>('')
  const [filteredArrayAsesores, setfilteredArrayAsesores] = useState<any>([]);
  const [filteredArraySolicitudes, setfilteredArraySolicitudes] = useState<any>([]);
  const [typing, setTyping] = useState<any>(false);
  const [currentTab, setCurrentTab] = useState<any>('');
  const removeDuplicates = (arr: any) => {
    return arr.filter((item: any,
      index: any) => arr.indexOf(item) === index);
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

  const onClickViewCalendar = () => {
    setviewCalendar(true);
  };

  const filterData = () => {
    console.log(flag)
    if (data != [] ){
      data.forEach((item: { is_accepted: any; }) => {
        if (item.is_accepted) {
          setAsesores((asesores: any) => [...asesores, item]);
        } else {
          setSolicitudesAsesores((solicitudesAsesores: any) => [...solicitudesAsesores, item])
        }
      });
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

  const acceptTutee = (id: any) => {
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
      getTuteesFromApi()
    })
    .catch(err => {
        console.log(err.message);
    })
    
  }

  const deleteTutee = (id: any) => {
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
      } else if (res.status === 204) {
        getTuteesFromApi()
      }
      return res.json();
    })
    .catch(err => {
        console.log(err.message);
    })
    
  }

  const renderFilterArrayAsesores = () => {
    if (filteredArrayAsesores.length != 0) {
      console.log("RE") 
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
            </tr>
          </thead>
          <tbody>
     { filteredArrayAsesores.map(function (item: any,index: any) {
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
              item.subjects.map( function(subject: any, index: any) {
                return ( <p key={index}>{subject.subject} </p> )
              })  
            }
          </td>
          <td className={styles.td}>
            <p>{item.completed_hours}/80</p>
          </td>
          <td className={styles.td}>
            <button onClick={() => showCalendar(item.schedules,item.name)} className={styles.button}>Ver</button>
          </td>
        </tr>
          );
        })} 
        </tbody>
        </table> 
      )  
    } else {
      console.log("no re")
      return (
        <div className={
          currentTab == 'tutors' ? styles.tableRequest : styles.hidden
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

  const renderFilterArraySolicitudes = () => {
    if (filteredArraySolicitudes.length != 0) { 
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
         { filteredArraySolicitudes.map(function (item: any,index: any) {
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
              item.subjects.map( function(subject: any, index: any) {
                return ( <p key={index}>{subject.subject} </p> )
              })  
            }
              </td>
              <td className={styles.td}>
                <button onClick={() => showCalendar(item.schedules,item.name)}  className={styles.button}>Ver</button>
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

  const conditionalRenderingAsesores = () => {
    if (!typing) {
      return renderAsesores();
    } else if (typing) {
      return renderFilterArrayAsesores()
    }
  };

  const conditionalRenderingSolicitudes = () => {
    console.log("es: ", typing )
    if (!typing) {
      return renderSolicitudesAsesores();
    } else if (typing) {
      return renderFilterArraySolicitudes()
    }
  };

  const filterAsesoresOfInput = (string: any) => {
    let RequestsCopy = [...asesores];
    console.log(RequestsCopy);
    let filteredArrayAsesores = RequestsCopy.filter((request) =>
    request.name.toLowerCase().includes(string.toLowerCase())
    );
    console.log("res: ", filteredArrayAsesores);
    setfilteredArrayAsesores(filteredArrayAsesores);
  }

  const filterSolicitudesOfInput = (string: any) => {
    let RequestsCopy = [...solicitudesAsesores];
    console.log(RequestsCopy);
    let filteredArrayAsesores = RequestsCopy.filter((request) =>
    request.name.toLowerCase().includes(string.toLowerCase())
    );
    console.log("res: ", filteredArrayAsesores);
    setfilteredArraySolicitudes(filteredArrayAsesores);
  }

  const handleSearchAsesores = (e: any) => {
    if (e.target.value != '') {
      setTyping(true);
      setInputSearch(e.target.value)
      filterAsesoresOfInput(e.target.value);
    } else {
      setTyping(false);
    }
    conditionalRenderingAsesores()
  }

  const handleSearchSolicitudes = (e: any) => {
    if (e.target.value != '') {
      setTyping(true);
      setInputSearch(e.target.value)
      filterSolicitudesOfInput(e.target.value);
    } else {
      setTyping(false);
    }
    conditionalRenderingSolicitudes()
  }

  const showCalendar = (schedules: any, name: any) => {
    setSchedules(schedules)
    setTutorName(name)
    onClickViewCalendar()
  }

  const renderAsesores = () => {
    if (asesores.length != 0) { 
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
            </tr>
          </thead>
          <tbody>
     { asesores.map(function (item: any,index: any) {
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
              item.subjects.map( function(subject: any, index: any) {
                return ( <p key={index}>{subject.subject} </p> )
              })  
            }
          </td>
          <td className={styles.td}>
            <p>{item.completed_hours}/80</p>
          </td>
          <td className={styles.td}>
            <button onClick={() => showCalendar(item.schedules,item.name)} className={styles.button}>Ver</button>
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
         { solicitudesAsesores.map(function (item: any,index: any) {
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
              item.subjects.map( function(subject: any, index: any) {
                return ( <p key={index}>{subject.subject} </p> )
              })  
            }
              </td>
              <td className={styles.td}>
                <button onClick={() => showCalendar(item.schedules,item.name)}  className={styles.button}>Ver</button>
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

  const renderInput = (option: any) => {
      return (
        <>
        <div style={{
          'display': 'flex',
          'flexDirection': 'column',
          'alignItems':'right',
          'width': '80%',
          'height': 'auto'
        }}>
          <p style={{
            'fontSize': '20px',
            'color': '#3f3b3b',
            'fontWeight': '400'
          }}>Buscar</p>
          <input style={{
          'border': 'none',
          'width': '25%',
          'height': '35px',
          'borderRadius': '5px',
          'color': '#7c7c7c',
          'fontWeight': '500',
          'marginRight': '20px',
          'marginTop': '15px',
          'marginBottom': '15px', 
          'fontSize': '14px',
          'paddingLeft': '15px',
          'backgroundColor': 'rgb(241, 241, 241)'
        }} type="text" placeholder='NOMBRE*' onChange={currentTab == 'request' ? handleSearchSolicitudes : handleSearchAsesores }/>
        </div>
        </>
      )
  }
  
  return (
    <div className={styles.main}>
       {currentTab == 'request' ? renderInput(1) : renderInput(2)  }
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
            {currentTab == 'request' ? conditionalRenderingSolicitudes() : conditionalRenderingAsesores()    }
            {  }
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

      {ViewCalendar && (
            <Calendar
              visible={ViewCalendar}
              setVisible={setviewCalendar}
              schedules={schedules}
              tutorName={TutorName}
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
