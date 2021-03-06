{
  /* si quieren usar este hook el código seria el sig:
    import useFetch from 'urldearchivo usePost'
    const [confirm, isPending, error ] = usePost('url de endpoint');
*/
}

import { useState, useEffect } from 'react';

const api = (url: RequestInfo, body: any, method: any) => {
  const requestOptions = {
    method,
    headers: { 'Content-Type': 'application/json' },
    body
  };

  const [Confirm, setConfirm] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url, requestOptions)
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error('could not make POST request for that endpoint');
        }
        return res.json();
      })
      .then((data) => {
        setIsPending(false);
        setConfirm(true); // if everything is ok set the confirm to true
        setError(null);
      })
      .catch((err) => {
        // auto catches network / connection error
        setIsPending(false);
        setError(err.message);
      });
  }, [url]);
  return { Confirm, isPending, error };
};

export default api;
