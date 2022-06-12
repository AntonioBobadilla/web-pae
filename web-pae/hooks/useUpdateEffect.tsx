/* eslint-disable */
import * as React from 'react';

export const useUpdateEffect = (
  fn: () => any,
  deps: React.DependencyList | undefined
) => {
  const mounted = React.useRef(false);
  return React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    return fn && fn();
  }, deps);
};
/* eslint-enable */
