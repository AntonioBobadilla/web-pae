import sidebarStyles from '../css/components/sidebar.module.css';
import Link from 'next/link';
import { UrlObject } from 'url';

const SideBar = (props: {
  dashboardFunction: string | UrlObject;
  profileFunction: string | UrlObject;
  tutoringFunction: string | UrlObject;
}) => {
  return (
    <div className={sidebarStyles.main}>
      <div className={sidebarStyles.normal}>
        <Link href="#">
          <div className={sidebarStyles.pae}>
            <img src="/images/pae-logo.png" className={sidebarStyles.logoPae} />
            <p className={sidebarStyles.textPae}>PAE</p>
          </div>
        </Link>
        <Link href={props.dashboardFunction}>
          <div className={sidebarStyles.dashboard}>
            <img
              src="/icons/house-door.svg"
              className={sidebarStyles.dbImage}
            ></img>
            <p className={sidebarStyles.dbText}>Dashboard</p>
          </div>
        </Link>
        <Link href={props.profileFunction}>
          <div className={sidebarStyles.dashboard}>
            <img
              src="/icons/person-circle.svg"
              className={sidebarStyles.dbImage}
            ></img>
            <p className={sidebarStyles.dbText}>Perfil</p>
          </div>
        </Link>
        <Link href={props.tutoringFunction}>
          <div className={sidebarStyles.dashboard}>
            <img
              src="/icons/calendar-week.svg"
              className={sidebarStyles.dbImage}
            ></img>
            <p className={sidebarStyles.dbText}>Agendar Asesoria</p>
          </div>
        </Link>
        <Link href="/../student/login">
          <div className={sidebarStyles.exit}>
            <img
              className={sidebarStyles.exitImage}
              src="/icons/arrow-bar-right.svg"
            />
          </div>
        </Link>
      </div>
      <div className={sidebarStyles.hamburgerMenu}>
        <input type="checkbox" className={sidebarStyles.toggler} />
        <div className={sidebarStyles.hamburger}>
          <div></div>
        </div>
        <div className={sidebarStyles.menu}>
          <div>
            <ul>
              <li>
                <Link href="#">
                  <div className={sidebarStyles.pae}>
                    <img
                      src="/images/pae-logo.png"
                      className={sidebarStyles.logoPae}
                    />
                    <p className={sidebarStyles.textPae}>PAE</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link href={props.dashboardFunction}>
                  <div className={sidebarStyles.dashboard}>
                    <img
                      src="/icons/house-door.svg"
                      className={sidebarStyles.dbImage}
                    ></img>
                    <p className={sidebarStyles.dbText}>Dashboard</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link href={props.profileFunction}>
                  <div className={sidebarStyles.dashboard}>
                    <img
                      src="/icons/person-circle.svg"
                      className={sidebarStyles.dbImage}
                    ></img>
                    <p className={sidebarStyles.dbText}>Perfil</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link href={props.tutoringFunction}>
                  <div className={sidebarStyles.dashboard}>
                    <img
                      src="/icons/calendar-week.svg"
                      className={sidebarStyles.dbImage}
                    ></img>
                    <p className={sidebarStyles.dbText}>Agendar Asesoria</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/../student/login">
                  <div className={sidebarStyles.exit}>
                    <img
                      className={sidebarStyles.exitImage}
                      src="/icons/arrow-bar-right.svg"
                    />
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
