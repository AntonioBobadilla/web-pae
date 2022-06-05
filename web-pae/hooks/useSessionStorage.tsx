import { useEffect, useState } from 'react';

const useSessionStorage = (name: string) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(JSON.parse(sessionStorage.getItem(name) || ''));
  }, []);

  return value;
};

export default useSessionStorage;
