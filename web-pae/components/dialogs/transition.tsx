import React from 'react';
import {
  Transition as ReactTransition,
  TransitionGroup
} from 'react-transition-group';

const TIMEOUT = 300;
const getTransitionStyles: Transition = {
  entering: {
    opacity: 0,
    transform: `scale(0.9)`
  },
  entered: {
    transition: `opacity ${TIMEOUT}ms ease, transform ${TIMEOUT}ms ease`,
    opacity: 1,
    transform: `translateX(0)`
  },
  exiting: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 0,
    transform: `scale(0.9)`
  },
  exited: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 0,
    transform: `scale(0.9)`
  }
};

type Transition = {
  [key: string]: React.CSSProperties;
};

type TransitionProps = {
  children: React.ReactChild;
  location: boolean;
  onExited: () => void;
  nodeRef: React.RefObject<HTMLDivElement>;
};

const Transition = ({
  children,
  location,
  onExited,
  nodeRef
}: TransitionProps) => (
  <TransitionGroup style={{ position: 'relative' }}>
    <ReactTransition
      in={location}
      timeout={{
        enter: TIMEOUT,
        exit: TIMEOUT
      }}
      appear
      onExited={onExited}
      unmountOnExit
      nodeRef={nodeRef}
    >
      {(status) => (
        <div
          style={{
            ...getTransitionStyles[status]
          }}
        >
          {children}
        </div>
      )}
    </ReactTransition>
  </TransitionGroup>
);
export default Transition;
