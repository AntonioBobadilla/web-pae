/* eslint-disable jsx-a11y/alt-text */
import Link from 'next/link';
import React from 'react';
import sidebarStyles from '../css/components/sidebar.module.css';

interface SideBarProps {
  routing: {
    routes: {
      path: string;
      icon: string;
      title: string;
    }[];
    exit: string;
  };
  currentRoute: string;
}

const SideBar = ({ routing, currentRoute }: SideBarProps) => (
  <div className={sidebarStyles.main}>
    <div className={sidebarStyles.normal}>
      <Link href="#" passHref>
        <div className={sidebarStyles.pae}>
          <img src="/images/pae-logo.png" className={sidebarStyles.logoPae} />
          <p className={sidebarStyles.textPae}>PAE</p>
        </div>
      </Link>
      {routing.routes.map((route) => (
        <Link href={route.path} passHref key={`${route.title}`}>
          <div
            className={sidebarStyles.dashboard}
            style={
              currentRoute === route.path
                ? { backgroundColor: 'white', color: '#0277BD' }
                : {}
            }
          >
            <div className={sidebarStyles.dbImage}>
              <i className={`bi bi-${route.icon}`} />
            </div>
            <p className={sidebarStyles.dbText}>{route.title}</p>
          </div>
        </Link>
      ))}

      <Link href={routing.exit} passHref>
        <div className={sidebarStyles.exit}>
          <i className="bi bi-arrow-bar-right" />
        </div>
      </Link>
    </div>
    <div className={sidebarStyles.hamburgerMenu}>
      <input type="checkbox" className={sidebarStyles.toggler} />
      <div className={sidebarStyles.hamburger}>
        <div />
      </div>
      <div className={sidebarStyles.menu}>
        <div>
          <ul>
            <li>
              <Link href="#" passHref>
                <div className={sidebarStyles.pae}>
                  <img
                    src="/images/pae-logo.png"
                    className={sidebarStyles.logoPae}
                  />
                  <p className={sidebarStyles.textPae}>PAE</p>
                </div>
              </Link>
            </li>
            {routing.routes.map((route) => (
              <li key={`${route.title}`}>
                <Link href={route.path} passHref>
                  <div
                    className={sidebarStyles.dashboard}
                    style={
                      currentRoute === route.path
                        ? { backgroundColor: 'white', color: '#0277BD' }
                        : {}
                    }
                  >
                    <div className={sidebarStyles.dbImage}>
                      <i className={`bi bi-${route.icon}`} />
                    </div>
                    <p className={sidebarStyles.dbText}>{route.title}</p>
                  </div>
                </Link>
              </li>
            ))}

            <li>
              <Link href={routing.exit} passHref>
                <div className={sidebarStyles.exit}>
                  <i className="bi bi-arrow-bar-right" />
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default SideBar;
