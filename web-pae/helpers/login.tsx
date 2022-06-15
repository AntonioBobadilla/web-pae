import post from './post';

async function login(username: string, password: string) {
  return post({ username, password }, 'http://10.50.84.114:4008/login/');
}

export default login;
