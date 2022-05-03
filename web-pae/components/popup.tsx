import Image from 'next/image';
import React from 'react';
import styles from '../css/components/popup.module.css';

interface PopupProps {
  children: React.ReactNode;
  title: string | undefined;
  line: boolean | undefined;
}

const Popup = ({ children, title, line }: PopupProps) => (
  <div className={styles.containerPopup}>
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

    <h2 className={styles.title}>{title}</h2>
    {line && <div className={styles.horizontalLine} />}
    {children}
  </div>
);
export default Popup;
