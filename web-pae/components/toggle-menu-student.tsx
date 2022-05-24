import tStyles from '../css/components/toggleMenuStudent.module.css';

const ToggleMenuStudent = (props: {}) => {
  return (
    <div className={tStyles.main}>
      <input type="checkbox" className={tStyles.toggler} />
      <div className={tStyles.buttonContainer} id="toggle">
        <img className={tStyles.icon} src="/icons/gear.svg"></img>
      </div>
      <div className={tStyles.overlay} id="overlay">
        <nav className={tStyles.overlayMenu}>
          <ul className={tStyles.ul}>
            <li className={tStyles.li}>
              <a className={tStyles.a}>Modificar contraseña</a>
            </li>
            <li className={tStyles.li}>
              <a className={tStyles.a}>Modificar idioma</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ToggleMenuStudent;
