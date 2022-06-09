/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/default-props-match-prop-types */
import DomHandler from 'helpers/dom-handler';
import { useMountEffect, useUnmountEffect, useUpdateEffect } from 'hooks/hooks';
import React, { ReactFragment } from 'react';
import ReactDOM from 'react-dom';

type PortalProps = {
  visible?: boolean;
  onMounted?: () => void;
  onUnmounted?: () => void;
  element: any;
  appendTo?: any;
};

const Portal = React.memo(
  ({ visible, onMounted, onUnmounted, element, appendTo }: PortalProps) => {
    const [mountedState, setMountedState] = React.useState(
      visible && DomHandler.hasDOM()
    );

    useMountEffect(() => {
      if (DomHandler.hasDOM() && !mountedState) {
        setMountedState(true);
        onMounted && onMounted();
      }
    });

    useUpdateEffect(() => {
      onMounted && onMounted();
    }, [mountedState]);

    useUnmountEffect(() => {
      onUnmounted && onUnmounted();
    });

    const realElement = element;
    if (realElement && mountedState) {
      const realAppendTo = appendTo || document.body;
      return realAppendTo === 'self'
        ? realElement
        : ReactDOM.createPortal(realElement, realAppendTo);
    }

    return null;
  }
);

Portal.displayName = 'Portal';
Portal.defaultProps = {
  __TYPE: 'Portal',
  appendTo: null,
  visible: false,
  onMounted: null,
  onUnmounted: null
};

export default Portal;
