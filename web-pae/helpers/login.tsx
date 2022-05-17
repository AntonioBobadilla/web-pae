const login = async (
  obj: { username: string; password: string },
  url: string
) => {
  let auth = true;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    });
    const status = await response.status;
    const json = await response.json();
    const ok = await response.ok;

    const { message } = json;

    if (!ok) {
      auth = false;
    }

    return { auth, message };
  } catch (err: any) {
    auth = false;
    // console.log(err.message);
    return { auth, message: err.message };
  }
};

export default login;
