/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';
import styles from '../css/components/popup.module.css';

interface PopupProps {
  children: React.ReactNode;
  title: string | undefined;
  line: boolean | undefined;
  style: any;
}

const Popup = ({ children, title, line, style }: PopupProps) => (
  <div className={classNames(styles.mask, styles.overlay)}>
    <div className={classNames(styles.dialog, style)}>
      <div className={styles.header}>
        <div className={styles.headerIcons}>
          <div className={styles.logo}>
            <Image
              src="/images/logo.png"
              alt="logo"
              priority
              layout="fixed"
              width={100}
              height={33}
            />
          </div>
        </div>
        <h2 className={styles.title}>{title}</h2>
        {line && <div className={styles.horizontalLine} />}
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  </div>
);
export default Popup;
