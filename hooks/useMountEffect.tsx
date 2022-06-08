/* eslint-disable */
import * as React from 'react';

export const useMountEffect = (fn: React.EffectCallback) =>
  React.useEffect(fn, []);
/* eslint-enable */
