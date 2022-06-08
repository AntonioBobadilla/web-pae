{ /* si quieren usar este hook el código seria el sig:
    import useFetch from 'urldearchivo useFetch'
    const [data, isPending, error ] = useFetch('url de endpoint');
*/}

import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch(url)
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that endpoint');
        } 
        return res.json();
      })
      .then(data => {
        setIsPending(false);
        setData(data);  // if everything is ok set the returned data
        setError(null);
      })
      .catch(err => {
        // auto catches network / connection error
        setIsPending(false);
        setError(err.message);
      })
    }, 1000);
  }, [url])

  return { data, isPending, error };
}
 
export default useFetch;