import post from './post';

async function studentSignup(data: any) {
  return post(data, 'http://10.50.84.114:4008/student/');
}

export default studentSignup;
