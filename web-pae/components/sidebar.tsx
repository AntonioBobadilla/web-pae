/* eslint-disable jsx-a11y/alt-text */
import Link from 'next/link';
import React from 'react';
import sidebarStyles from '../css/components/sidebar.module.css';
import adminStyles from '../css/components/sidebarAdmin.module.css';

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
  <div
    className={
      currentRoute.includes('admin') ? adminStyles.main : sidebarStyles.main
    }
  >
    <div
      className={
        currentRoute.includes('admin')
          ? adminStyles.normal
          : sidebarStyles.normal
      }
    >
      <Link href="#" passHref>
        <div
          className={
            currentRoute.includes('admin') ? adminStyles.pae : sidebarStyles.pae
          }
        >
          <img
            src="/images/pae-logo.png"
            className={
              currentRoute.includes('admin')
                ? adminStyles.logoPae
                : sidebarStyles.logoPae
            }
          />
          <p
            className={
              currentRoute.includes('admin')
                ? adminStyles.textPae
                : sidebarStyles.textPae
            }
          >
            PAE
          </p>
        </div>
      </Link>
      {routing.routes.map((route) => (
        <Link href={route.path} passHref key={`${route.title}`}>
          <div
            className={
              currentRoute.includes('admin')
                ? adminStyles.dashboard
                : sidebarStyles.dashboard
            }
            style={
              currentRoute === route.path
                ? { backgroundColor: 'white', color: '#0277BD' }
                : {}
            }
          >
            <div
              className={
                currentRoute.includes('admin')
                  ? adminStyles.dbImage
                  : sidebarStyles.dbImage
              }
            >
              <i className={`bi bi-${route.icon}`} />
            </div>
            <p
              className={
                currentRoute.includes('admin')
                  ? adminStyles.dbText
                  : sidebarStyles.dbText
              }
            >
              {route.title}
            </p>
          </div>
        </Link>
      ))}

      <Link href={routing.exit} passHref>
        <div
          className={
            currentRoute.includes('admin')
              ? adminStyles.exit
              : sidebarStyles.exit
          }
        >
          <i className="bi bi-arrow-bar-right" />
        </div>
      </Link>
    </div>
    <div
      className={
        currentRoute.includes('admin')
          ? adminStyles.hamburgerMenu
          : sidebarStyles.hamburgerMenu
      }
    >
      <input
        type="checkbox"
        className={
          currentRoute.includes('admin')
            ? adminStyles.toggler
            : sidebarStyles.toggler
        }
      />
      <div
        className={
          currentRoute.includes('admin')
            ? adminStyles.hamburger
            : sidebarStyles.hamburger
        }
      >
        <div />
      </div>
      <div
        className={
          currentRoute.includes('admin') ? adminStyles.menu : sidebarStyles.menu
        }
      >
        <div>
          <ul>
            <li>
              <Link href="#" passHref>
                <div
                  className={
                    currentRoute.includes('admin')
                      ? adminStyles.pae
                      : sidebarStyles.pae
                  }
                >
                  <img
                    src="/images/pae-logo.png"
                    className={
                      currentRoute.includes('admin')
                        ? adminStyles.logoPae
                        : sidebarStyles.logoPae
                    }
                  />
                  <p
                    className={
                      currentRoute.includes('admin')
                        ? adminStyles.textPae
                        : sidebarStyles.textPae
                    }
                  >
                    PAE
                  </p>
                </div>
              </Link>
            </li>
            {routing.routes.map((route) => (
              <li key={`${route.title}`}>
                <Link href={route.path} passHref>
                  <div
                    className={
                      currentRoute.includes('admin')
                        ? adminStyles.dashboard
                        : sidebarStyles.dashboard
                    }
                    style={
                      currentRoute === route.path
                        ? { backgroundColor: 'white', color: '#0277BD' }
                        : {}
                    }
                  >
                    <div
                      className={
                        currentRoute.includes('admin')
                          ? adminStyles.dbImage
                          : sidebarStyles.dbImage
                      }
                    >
                      <i className={`bi bi-${route.icon}`} />
                    </div>
                    <p
                      className={
                        currentRoute.includes('admin')
                          ? adminStyles.dbText
                          : sidebarStyles.dbText
                      }
                    >
                      {route.title}
                    </p>
                  </div>
                </Link>
              </li>
            ))}

            <li>
              <Link href={routing.exit} passHref>
                <div
                  className={
                    currentRoute.includes('admin')
                      ? adminStyles.exit
                      : sidebarStyles.exit
                  }
                >
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
