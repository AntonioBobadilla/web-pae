import useSessionStorage from './useSessionStorage';

export default function useToken() {
  const token = useSessionStorage('token');

  const saveToken = (userToken: string) => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
  };

  return {
    setToken: saveToken,
    token
  };
}
