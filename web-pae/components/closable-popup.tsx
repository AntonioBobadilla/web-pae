import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';
import styles from '../css/components/closable-popup.module.css';

export interface PopupProps {
  children: React.ReactNode;
  title: string | undefined;
  line: boolean | undefined;
  visible: boolean | undefined;
  style: any;
}

const ClosablePopup = ({
  children,
  title,
  line,
  visible,
  style
}: PopupProps) => {
  const createHeader = () => {
    const closeIcon = 1;
    // const maximizeIcon = createMaximizeIcon();
    // const icons = ObjectUtils.getJSXElement(props.icons, props);
    // const header = ObjectUtils.getJSXElement(props.header, props);
    // const headerId = `${idState}_header`;
    // const headerClassName = classNames(
    //   'p-dialog-header',
    //   props.headerClassName
    // );

    return (
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
          <i className="bi bi-x-lg" />
        </div>
      </div>
      //   <div className={headerClassName}>
      //     <div id={headerId} className="p-dialog-title">
      //       {header}
      //     </div>
      //     <div className="p-dialog-header-icons">
      //       {icons}
      //       {maximizeIcon}
      //       {closeIcon}
      //     </div>
      //   </div>
    );
  };

  return (
    <div className={styles.portal}>
      {visible && (
        <div className={classNames(styles.mask, visible && styles.maskVisible)}>
          <div
            className={classNames(styles.dialog, style)}
            role="dialog"
            //   {...otherProps}
          >
            {createHeader()}
            {/* {content} */}
            {/* {footer} */}
            {/* {resizer} */}
          </div>
          {/* <div className={styles.logo}>
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
                      {children} */}
        </div>
      )}
    </div>
  );
};
export default ClosablePopup;
