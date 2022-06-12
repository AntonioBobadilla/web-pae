import SuccessAcceptTutoring from '@/components/dialogs/accept-tutoring';
import DeniedTutoring from '@/components/dialogs/denied-tutoring';
import Modalidad from '@/components/dialogs/edit-modalidad';
import SeleccionarAsesor from '@/components/dialogs/editar-asesor';
import styles from '@/css-admin/tutees.module.css';
import tutorintstyles from '@/css-components/tutoring-requests.module.css';
import { selectToken } from '@/redux/user';
import cx from 'classnames';
import React, { ReactElement, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAppSelector } from 'store/hook';
import SidebarLayout from '../../components/layouts/sidebar-layout';

const Tutorings = () => {
  const [data, setData] = useState<any>([]);
  const [currentTab, setCurrentTab] = useState<any>('');
  const [EditModalidad, setModalidad] = useState<any>(false);
  const [Asesor, setAsesor] = useState<any>(false);
  const [newAsesor, setNewAsesor] = useState<any>('');
  const [objectToModify, setObjectToModify] = useState<any>(0);
  const [objectModalidad, setObjectModalidad] = useState<any>([]);
  const [newPlace, setNewPlace] = useState<any>('');
  const [NewModalidad, setNewModalidad] = useState<any>('');
  const [SuccessAcceptTutoringVisible, setSuccessAcceptTutoringVisible] =
    useState<any>(false);
  const [DeniedTutoringVisible, setDeniedTutoringVisible] =
    useState<any>(false);
  const [confirmDelete, setConfirmDelete] = useState<any>(false);
  const [TuteeIdToDelete, setTuteeIdToDelete] = useState<any>(0);
  const [pending, setPending] = useState<any>(true);

  const token = useAppSelector(selectToken);

  const [day, setDay] = useState<any>('');
  const [hour, setHour] = useState<any>('');
  const [subject, setSubject] = useState<any>('');

  const getDataFromApi = () => {
    fetch('https://server-pae.azurewebsites.net/tutoring/?status=PE', {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`
      }
    })
      .then((resp) => resp.json())
      .then((data) => {
        setData(data);
        console.log('aaaaa: ', data);
        setPending(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    if (newAsesor == '') return;
    fetch(
      `https://server-pae.azurewebsites.net/changetutor/${objectToModify}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        },
        body: JSON.stringify({ tutor: newAsesor.toLowerCase() }) // agregar json de update
      }
    )
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error('could not make PUT request for that endpoint');
        }
        return res.json();
      })
      .then((data) => {
        console.log('ok');
        toast('Asesor actualizado', {
          icon: '😄'
        });
        getDataFromApi();
      })
      .catch((err) => {
        console.log(err.message);
      });
    console.log('actualizando tutor.... desde func', newAsesor);
  };

  // función que realizara el update del tutor basado en el indice guardado en objectToModify
  const updatemodalidad = () => {
    const online = NewModalidad == 'En línea';
    if (objectToModify == 0) return;
    fetch(
      `https://server-pae.azurewebsites.net/changetutoringlocation/${objectToModify}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        },
        body: JSON.stringify({
          is_online: online,
          place: newPlace
        }) // agregar json de update
      }
    )
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error('could not make PUT request for that endpoint');
        }
        return res.json();
      })
      .then((data) => {
        toast('Modalidad actualizada', {
          icon: '✅'
        });
        getDataFromApi();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const updateModalidad = () => {
    updatemodalidad();
  };

  useEffect(() => {
    if (confirmDelete == true) del();
  }, [confirmDelete]); // <-- here put the parameter to listen

  useEffect(() => {
    getDataFromApi();
  }, []);

  useEffect(() => {
    updateAsesor();
  }, [newAsesor]);

  useEffect(() => {
    updateModalidad();
  }, [NewModalidad]);

  const editModalidad = (modalidadObj: any, idABorrar: any) => {
    setObjectToModify(idABorrar); // ese es el indice que guardaremos
    setObjectModalidad(modalidadObj);
    onClickModalidad();
  };
  // en esta funcion  vamos a recibir el indice del objeto del arreglo de objetos traidos por api
  // para así al actualizar ese objeto nos basemos en su indice para saber qué objeto actualizar
  const EditAsesor = (idOfObject: any, day: any, hour: any, subject: any) => {
    setDay(day);
    setHour(hour);
    setSubject(subject);
    setObjectToModify(idOfObject); // ese es el indice que guardaremos
    onClickEditAsesor();
  };

  // agregar token dinamico
  const del = () => {
    fetch(
      `https://server-pae.azurewebsites.net/updatetutoring/${TuteeIdToDelete}/CA`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        }
      }
    )
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error('could not make POST request for that endpoint');
        } else if (res.status === 204) {
          getDataFromApi();
          toast('Asesoría rechazada', {
            icon: '✅'
          });
        }
        return res.json();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const deleteTutoring = (id: any) => {
    setTuteeIdToDelete(id);
    onClickDeniedTutoring();
  };

  const acceptTutoring = (id: any) => {
    fetch(`https://server-pae.azurewebsites.net/updatetutoring/${id}/AP`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error('could not make PUT request for that endpoint');
        }
        return res.json();
      })
      .then((data) => {
        console.log('ok');
        onClickSuccessAcceptTutoring();

        toast('Asesoría aceptada', {
          icon: '✅'
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const renderTable = () => {
    if (data.length != 0) {
      return (
        <table className={styles.tableRequest}>
          <thead>
            <tr className={cx(styles.headRow, styles.tr)}>
              <th className={styles.head}>Alumno solicitante</th>
              <th className={styles.head}>Asesor sugerido</th>
              <th className={styles.head}>UF solicitada</th>
              <th className={styles.head}>Horario</th>
              <th className={styles.head}>Modalidad</th>
              <th className={styles.head} />
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, index: any) => {
              const { student, subject, tutor } = item;
              console.log(data);
              const modalidad = item.is_online ? 'En línea' : 'Presencial';
              return (
                <tr key={index} className={styles.tr}>
                  <td className={styles.td}>
                    <p className={tutorintstyles.name}>{student.name} </p>
                    <p className={tutorintstyles.apellidos} />
                    <div className={tutorintstyles.data}>
                      <p className={tutorintstyles.major}>{student.major}</p>
                      <p className={tutorintstyles.matricula}>
                        {student.registration_number}
                      </p>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <p className={tutorintstyles.name}>{tutor.name}</p>
                    <p className={tutorintstyles.apellidos} />
                    <div className={tutorintstyles.data}>
                      <p className={tutorintstyles.major} />
                      <p className={tutorintstyles.matricula}>
                        {tutor.registration_number}
                      </p>
                      <button
                        className={tutorintstyles.button}
                        onClick={() =>
                          EditAsesor(
                            item.id,
                            item.date,
                            item.hour,
                            subject.code
                          )
                        }
                      >
                        <i
                          className={cx(tutorintstyles.button, 'bi bi-pencil')}
                        />
                      </button>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <p className={tutorintstyles.subject}> {subject.code} </p>
                    <p className={tutorintstyles.subjectfull}>{subject.name}</p>
                  </td>
                  <td className={styles.td}>
                    <p className={tutorintstyles.fullday}>{item.date}</p>
                    <p className={tutorintstyles.hora}>{item.hour}</p>
                  </td>
                  <td className={styles.td}>
                    <p className={tutorintstyles.item}>{modalidad}</p>
                    <p className={tutorintstyles.item}>{item.place}</p>
                    <button
                      className={tutorintstyles.button}
                      onClick={() =>
                        editModalidad(
                          { forma: modalidad, lugar: item.place },
                          item.id
                        )
                      }
                    >
                      <i
                        className={cx(tutorintstyles.button, 'bi bi-pencil')}
                      />
                    </button>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.flex}>
                      <button
                        onClick={() => acceptTutoring(item.id)}
                        className={styles.accept}
                      >
                        Aceptar asesoría
                      </button>
                      <button
                        onClick={() => deleteTutoring(item.id)}
                        className={styles.denied}
                      >
                        Rechazar asesoría
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    if (data.length == 0 && pending == false) {
      return (
        <div>
          <table className={styles.tableRequest}>
            <thead>
              <tr className={cx(styles.headRow, styles.tr)}>
                <th className={styles.head}>Alumno solicitante</th>
                <th className={styles.head}>Asesor sugerido</th>
                <th className={styles.head}>UF solicitada</th>
                <th className={styles.head}>Horario</th>
                <th className={styles.head}>Modalidad</th>
                <th className={styles.head} />
              </tr>
            </thead>
            <tbody />
          </table>
          <p className={tutorintstyles.emptyMessage}>
            No hay solicitudes disponibles
          </p>
        </div>
      );
    }
  };

  return (
    <div className={tutorintstyles.main}>
      <button className={tutorintstyles.Mainbutton}>
        Asesorías solicitadas
      </button>
      {renderTable()}

      {pending && <div>Cargando datos...</div>}

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
          day={day}
          hour={hour}
          subject={subject}
        />
      )}
    </div>
  );
};

// Add sidebar layout
Tutorings.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Solicitudes de asesorías">{page}</SidebarLayout>;
};

export default Tutorings;
