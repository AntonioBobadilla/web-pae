import tStyles from '../css/components/toggleMenu.module.css';

type ToggleMenuProps = {
  onClickModifyPassword: () => void;
  onClickModifyLanguage: () => void;
};

const ToggleMenu = ({
  onClickModifyPassword,
  onClickModifyLanguage
}: ToggleMenuProps) => {
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
              <a className={tStyles.a}>Modificar horario</a>
            </li>
            <li className={tStyles.li}>
              <a className={tStyles.a}>Modificar materias</a>
            </li>
            <li className={tStyles.li}>
              <span
                role="button"
                className={tStyles.a}
                onClick={() => onClickModifyPassword()}
                tabIndex={-1}
              >
                Modificar contraseña
              </span>
            </li>
            <li className={tStyles.li}>
              <span
                role="button"
                className={tStyles.a}
                onClick={() => onClickModifyLanguage()}
                tabIndex={-1}
              >
                Modificar idioma
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ToggleMenu;
