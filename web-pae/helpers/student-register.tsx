import post from './post';

async function studentSignup(data: any) {
  return post(data, 'https://server-pae.azurewebsites.net/student/');
}

export default studentSignup;
