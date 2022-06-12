import post from '@/helpers/post';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ActivateAccount = () => {
  const { query, push } = useRouter();
  const { token } = query;

  useEffect(() => {
    post(
      {
        token
      },
      'https://server-pae.azurewebsites.net/verifyemail/'
    ).then(({ status, responseData }) => {
      try {
        const { message, role } = responseData;
        if (status === 200 || status === 201 || status === 204) {
          // toast success
          toast.success(message);
          // redirect to home
          setTimeout(() => push(`/${role}/login`), 1000);
        } else {
          // toast error
          toast.error(message);
        }
      } catch (err) {
        toast.error('Algo salió mal');
      }
    });
  }, []);

  return (
    <div>
      <Image
        src="/images/logo.png"
        alt="logo"
        priority
        layout="fixed"
        width={100}
        height={33}
      />
      <h1>Verificando cuenta</h1>
      <h2>Espera un momento...</h2>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default ActivateAccount;
