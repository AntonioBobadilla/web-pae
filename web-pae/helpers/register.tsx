const register = async (data: any, url: string) => {
  let auth = true;
  try {
    // console.log(JSON.stringify(data));
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    console.log(response);

    const status = await response.status;

    const json = await response.json();
    console.log(json);

    const ok = await response.ok;
    const { message } = json;

    if (!ok) {
      auth = false;
    }

    return { auth, message };
  } catch (err: any) {
    auth = false;
    console.log(err);
    return { auth, message: err.message };
  }
};

export default register;
