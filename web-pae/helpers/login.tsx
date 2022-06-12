import post from './post';

async function login(username: string, password: string) {
  return post(
    { username, password },
    'https://server-pae.azurewebsites.net/login/'
  );
}

export default login;
