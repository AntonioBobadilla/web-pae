import post from './post';

async function studentSignup(data: any) {
  return post(data, 'http://server-pae.azurewebsites.net/student/');
}

export default studentSignup;
