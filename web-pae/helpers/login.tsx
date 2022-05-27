async function login(username: string, password: string) {
  try {
    const response = await fetch('http://server-pae.azurewebsites.net/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password }),
      cache: 'no-cache',
      credentials: 'same-origin'
      // mode: 'cors'
    });
    const status = await response.status;
    const responseData = await response.json();

    return { status, responseData };
  } catch (err: any) {
    // console.log(err.message);
    return { status: 500, message: err.message };
    // sessionStorage.setItem('token', JSON.stringify(userToken));
  }
}

export default login;
