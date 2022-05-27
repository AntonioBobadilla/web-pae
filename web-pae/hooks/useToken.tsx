import { selectToken } from '@/redux/user';
import { useState } from 'react';
import { useAppSelector } from 'store/hook';

export default function useToken() {
  const tokenString = useAppSelector(selectToken);
  const getToken = () =>
    // const tokenString = sessionStorage.getItem('token');

    // const userToken = JSON.parse(tokenString);
    tokenString;
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: string) => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  };
}
