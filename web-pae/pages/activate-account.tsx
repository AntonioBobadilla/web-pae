import ButtonTemplate from '@/components/button-template';
import post from '@/helpers/post';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ActivateAccount = () => {
  const { query, push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const verifyEmail = () => {
    const { token } = query;
    setIsLoading(true);
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
          toast.error('Invalid token or email already verified');
        }
        setIsLoading(false);
      } catch (err) {
        toast.error('Algo salió mal');
        setIsLoading(false);
      }
    });
  };

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

      <ButtonTemplate
        style={{ width: '25%', margin: 'auto', height: '35px' }}
        variant="primary"
        onClick={() => verifyEmail()}
        loading={isLoading}
        disabled={isLoading}
      >
        {!isLoading ? 'Verificar mi cuenta' : 'Verificando...'}
      </ButtonTemplate>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default ActivateAccount;
