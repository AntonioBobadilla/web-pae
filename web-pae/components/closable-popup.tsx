/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-no-useless-fragment */
import Transition from '@/components/dialogs/transition';
import { useKeyPress } from '@/hooks/useKeyPress';
import { useMountEffect } from '@/hooks/useMountEffect';
import { useUpdateEffect } from '@/hooks/useUpdateEffect';
import classNames from 'classnames';
import Image from 'next/image';
import React, { useEffect } from 'react';
import styles from '../css/components/closable-popup.module.css';
import Portal from './dialogs/portal';

export interface PopupProps {
  children: React.ReactNode;
  title: string | undefined;
  line: boolean | undefined;
  visible: boolean;
  style: any;
  setVisible: (visible: boolean) => void;
}

const ClosablePopup = ({
  children,
  title,
  line,
  visible,
  style,
  setVisible
}: PopupProps) => {
  const [maskVisibleState, setMaskVisibleState] = React.useState(false);
  const [visibleState, setVisibleState] = React.useState(false);
  const dialogRef = React.useRef(null);

  const ESC = useKeyPress('Escape');

  useEffect(() => {
    if (ESC) {
      setVisible(false);
    }
  });

  const onExited = () => {
    setMaskVisibleState(false);
  };

  useMountEffect(() => {
    if (visible) {
      setMaskVisibleState(true);
    }
  });

  useUpdateEffect(() => {
    if (visible && !maskVisibleState) {
      setMaskVisibleState(true);
    }

    if (visible !== visibleState && maskVisibleState) {
      setVisibleState(visible);
    }
  }, [visible]);

  useUpdateEffect(() => {
    if (maskVisibleState) {
      setVisibleState(true);
    }
  }, [maskVisibleState]);

  const onClose = (event: { preventDefault: () => void }) => {
    // props.onHide();
    setVisible(false);
    event.preventDefault();
  };

  const createHeader = () => (
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
        <i
          className="bi bi-x-lg"
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={onClose}
          role="button"
          tabIndex={-1}
        />
      </div>
      <h2 className={styles.title}>{title}</h2>
      {line && <div className={styles.horizontalLine} />}
    </div>
  );

  const createElement = () => (
    <div
      className={classNames(
        styles.mask,
        styles.overlay,
        visible && styles.maskVisible
      )}
    >
      <Transition
        nodeRef={dialogRef}
        onExited={onExited}
        location={visibleState}
      >
        <div
          className={classNames(styles.dialog, style)}
          role="dialog"
          ref={dialogRef}
          //   {...otherProps}
        >
          {createHeader()}
          <div className={styles.body}>{children}</div>
          {/* {footer} */}
          {/* {resizer} */}
        </div>
      </Transition>
    </div>
  );

  const createDialog = () => {
    const element = createElement();

    return <Portal element={element} visible />;
  };

  return <>{maskVisibleState && createDialog()}</>;
};
export default ClosablePopup;
