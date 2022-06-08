/* eslint-disable */
import * as React from 'react';

export const useUnmountEffect = (fn: any) => React.useEffect(() => fn, []);
/* eslint-enable */
