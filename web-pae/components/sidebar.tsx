import sidebarStyles from '../css/components/sidebar.module.css';

const SideBar = () => {
  return (
    <div className={sidebarStyles.main}>
      <div className={sidebarStyles.pae}>
        <img src="/images/pae-logo.png" className={sidebarStyles.logoPae} />
        <p className={sidebarStyles.textPae}>PAE</p>
      </div>
      <div className={sidebarStyles.dashboard}>
        <img
          src="/icons/house-door.svg"
          className={sidebarStyles.dbImage}
        ></img>
        <p className={sidebarStyles.dbText}>Dashboard</p>
      </div>
      <div className={sidebarStyles.dashboard}>
        <img
          src="/icons/person-circle.svg"
          className={sidebarStyles.dbImage}
        ></img>
        <p className={sidebarStyles.dbText}>Perfil</p>
      </div>
      <div className={sidebarStyles.dashboard}>
        <img
          src="/icons/calendar-week.svg"
          className={sidebarStyles.dbImage}
        ></img>
        <p className={sidebarStyles.dbText}>Agendar Asesoria</p>
      </div>
      <div className={sidebarStyles.exit}>
        <img
          className={sidebarStyles.exitImage}
          src="/icons/arrow-bar-right.svg"
        />
      </div>
    </div>
  );
};

export default SideBar;
