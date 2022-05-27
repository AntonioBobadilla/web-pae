import post from './post';

async function login(username: string, password: string) {
  return post(
    { username, password },
    'http://server-pae.azurewebsites.net/login/'
  );
}

export default login;
