{ /* si quieren usar este hook el código seria el sig:
    import useFetch from 'urldearchivo usePost'
    const [confirm, isPending, error ] = usePost('url de endpoint');
*/}

import { useState, useEffect } from 'react';

export default function postRequest(url, body) {
        
    const [Confirm, setConfirm] = useState(false);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
    };
    
      useEffect(() => {
          fetch(url, requestOptions)
          .then(res => {
            if (!res.ok) { // error coming back from server
              throw Error('could not make POST request for that endpoint');
            } 
            return res.json();
          })
          .then(data => {
            setIsPending(false);
            setConfirm(true);  // if everything is ok set the confirm to true
            setError(null);
          })
          .catch(err => {
            // auto catches network / connection error
            setIsPending(false);
            setError(err.message);
          })
      }, [url])
      return { Confirm, isPending, error };
};