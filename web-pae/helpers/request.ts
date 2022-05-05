const request = async (url: string, body: object) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (res.status === 200 || res.status === 201) {
      const data = await res.json();
      return { data };
    } else {
      return { errors: 'something went wrong' };
    }
  } catch (err) {
    console.log(err);
  }
};

export default request;
