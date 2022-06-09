import tStyles from '../css/components/toggleMenu.module.css';

type ToggleMenuProps = {
  onClickModifyPassword: () => void;
  onClickModifyLanguage: () => void;
  onClickModifySubjects: () => void;
  onClickModifySchedule: () => void;
};

const ToggleMenu = ({
  onClickModifyPassword,
  onClickModifyLanguage,
  onClickModifySubjects,
  onClickModifySchedule

}: ToggleMenuProps) => (
  <div className={tStyles.main}>
    <input type="checkbox" className={tStyles.toggler} />
    <div className={tStyles.buttonContainer} id="toggle">
      <img className={tStyles.icon} src="/icons/gear.svg" />
    </div>
    <div className={tStyles.overlay} id="overlay">
      <nav className={tStyles.overlayMenu}>
        <ul className={tStyles.ul}>
          <li className={tStyles.li}>
            <span
              role="button"
              className={tStyles.a}
              onClick={() => onClickModifySchedule()}
              tabIndex={-1}
            >
              Modificar horario
            </span>
          </li>
          <li className={tStyles.li}>
            <span
              role="button"
              className={tStyles.a}
              onClick={() => onClickModifySubjects()}
              tabIndex={-1}
            >
              Modificar materias
            </span>
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

export default ToggleMenu;
