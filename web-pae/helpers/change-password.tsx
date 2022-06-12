export type ModifyPasswordData = {
  currentPassword: string;
  newPassword: string;
  passwordConfirmation: string;
};
async function changePassword(data: ModifyPasswordData, token: string) {
  try {
    const response = await fetch(
      'https://server-pae.azurewebsites.net/changepassword/',
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        },
        body: JSON.stringify({
          password: data.currentPassword,
          new_password: data.newPassword,
          confirm_new_password: data.passwordConfirmation
        }),
        cache: 'no-cache',
        credentials: 'same-origin'
        // mode: 'cors'
      }
    );
    const status = await response.status;
    const responseData = await response.json();

    return { status, responseData };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // console.log(err.message);
    return { status: 500, message: err.message };
    // sessionStorage.setItem('token', JSON.stringify(userToken));
  }
}

export default changePassword;
