import useSessionStorage from './useSessionStorage';

export default function useRole() {
  const role = useSessionStorage('role');

  const saveRole = (userRole: string) => {
    sessionStorage.setItem('role', JSON.stringify(userRole));
  };

  return {
    setRole: saveRole,
    role
  };
}
