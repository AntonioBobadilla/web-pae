import cx from 'classnames';
import styles from '@/css-components/tutoring/tutoring-requests-component.module.css'

const TutoringRequests = () => (
    <div className={styles.main}>
        <table className={styles.table}>
            <tr className={cx(styles.headRow, styles.tr)}>
                <th className={styles.head}>Alumno solicitante</th>
                <th className={styles.head}>Asesor sugerido</th>
                <th className={styles.head}>UF solicitada</th>
                <th className={styles.head}>Horario</th>
                <th className={styles.head}>Modalidad</th>
                <th className={styles.head}></th>
            </tr>
            <tr className={styles.tr}>
                <td className={styles.td}>
                    <p className={styles.name}>José Antonio </p>
                    <p className={styles.apellidos}>Bobadilla García</p>
                    <div className={styles.data}>
                        <p className={styles.major}>IMT</p>
                        <p className={styles.matricula}>A01734433</p>
                    </div>
                </td>
                <td className={styles.td}>
                    <p className={styles.name}>José Antonio </p>
                    <p className={styles.apellidos}>Bobadilla García</p>
                    <div className={styles.data}>
                        <p className={styles.major}>IMT</p>
                        <p className={styles.matricula}>A01734433</p>
                        <i className={cx(styles.icon, "bi bi-pencil")}></i>
                    </div>
                </td>
                <td className={styles.td}>
                    <p className={styles.subject}>TC2005B</p>
                    <p className={styles.subjectName}>Programación orientada a objetos</p>
                </td>
                <td className={styles.td}>
                    <p className={styles.horario}>18 de Marzo</p>
                    <p className={styles.hora}>12:00pm</p>
                </td>
                <td className={cx(styles.td, styles.flex)}>
                    <p className={styles.modalidad}>En línea</p>
                    <i className={cx(styles.icon, "bi bi-pencil")}></i>
                </td>
                <td className={styles.td}>
                    <button className={styles.accept}>Aceptar asesoría</button>
                    <button className={styles.denied}>Rechazar asesoría</button>
                </td>
            </tr>
            <tr className={styles.tr}>
                <td className={styles.td}>
                    <p className={styles.name}>José Antonio </p>
                    <p className={styles.apellidos}>Bobadilla García</p>
                    <div className={styles.data}>
                        <p className={styles.major}>IMT</p>
                        <p className={styles.matricula}>A01734433</p>
                    </div>
                </td>
                <td className={styles.td}>
                    <p className={styles.name}>José Antonio </p>
                    <p className={styles.apellidos}>Bobadilla García</p>
                    <div className={styles.data}>
                        <p className={styles.major}>IMT</p>
                        <p className={styles.matricula}>A01734433</p>
                        <i className={cx(styles.icon, "bi bi-pencil")}></i>
                    </div>
                </td>
                <td className={styles.td}>
                    <p className={styles.subject}>TC2005B</p>
                    <p className={styles.subjectName}>Programación orientada a objetos</p>
                </td>
                <td className={styles.td}>
                    <p className={styles.horario}>18 de Marzo</p>
                    <p className={styles.hora}>12:00pm</p>
                </td>
                <td className={cx(styles.td, styles.flex)}>
                    <p className={styles.modalidad}>En línea</p>
                    <i className={cx(styles.icon, "bi bi-pencil")}></i>
                </td>
                <td className={styles.td}>
                    <button className={styles.accept}>Aceptar asesoría</button>
                    <button className={styles.denied}>Rechazar asesoría</button>
                </td>
            </tr>
            <tr className={styles.tr}>
                <td className={styles.td}>
                    <p className={styles.name}>José Antonio </p>
                    <p className={styles.apellidos}>Bobadilla García</p>
                    <div className={styles.data}>
                        <p className={styles.major}>IMT</p>
                        <p className={styles.matricula}>A01734433</p>
                    </div>
                </td>
                <td className={styles.td}>
                    <p className={styles.name}>José Antonio </p>
                    <p className={styles.apellidos}>Bobadilla García</p>
                    <div className={styles.data}>
                        <p className={styles.major}>IMT</p>
                        <p className={styles.matricula}>A01734433</p>
                        <i className={cx(styles.icon, "bi bi-pencil")}></i>
                    </div>
                </td>
                <td className={styles.td}>
                    <p className={styles.subject}>TC2005B</p>
                    <p className={styles.subjectName}>Programación orientada a objetos</p>
                </td>
                <td className={styles.td}>
                    <p className={styles.horario}>18 de Marzo</p>
                    <p className={styles.hora}>12:00pm</p>
                </td>
                <td className={cx(styles.td, styles.flex)}>
                    <p className={styles.modalidad}>En línea</p>
                    <i className={cx(styles.icon, "bi bi-pencil")}></i>
                </td>
                <td className={styles.td}>
                    <button className={styles.accept}>Aceptar asesoría</button>
                    <button className={styles.denied}>Rechazar asesoría</button>
                </td>
            </tr>
            <tr className={styles.tr}>
                <td className={styles.td}>
                    <p className={styles.name}>José Antonio </p>
                    <p className={styles.apellidos}>Bobadilla García</p>
                    <div className={styles.data}>
                        <p className={styles.major}>IMT</p>
                        <p className={styles.matricula}>A01734433</p>
                    </div>
                </td>
                <td className={styles.td}>
                    <p className={styles.name}>José Antonio </p>
                    <p className={styles.apellidos}>Bobadilla García</p>
                    <div className={styles.data}>
                        <p className={styles.major}>IMT</p>
                        <p className={styles.matricula}>A01734433</p>
                        <i className={cx(styles.icon, "bi bi-pencil")}></i>
                    </div>
                </td>
                <td className={styles.td}>
                    <p className={styles.subject}>TC2005B</p>
                    <p className={styles.subjectName}>Programación orientada a objetos</p>
                </td>
                <td className={styles.td}>
                    <p className={styles.horario}>18 de Marzo</p>
                    <p className={styles.hora}>12:00pm</p>
                </td>
                <td className={cx(styles.td, styles.flex)}>
                    <p className={styles.modalidad}>En línea</p>
                    <i className={cx(styles.icon, "bi bi-pencil")}></i>
                </td>
                <td className={styles.td}>
                    <button className={styles.accept}>Aceptar asesoría</button>
                    <button className={styles.denied}>Rechazar asesoría</button>
                </td>
            </tr>
        </table> 
    </div>
);

export default TutoringRequests;
