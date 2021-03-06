import { selectToken } from '@/redux/user';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useAppSelector } from 'store/hook';
import Styles from '../css/components/adminForm.module.css';
import AdminAdded from './dialogs/admin-added';
import Password from './password';
import TextInput from './text-input';

interface AdminFormData {
  name: string;
  email: string;
  registrationNumber: string;
  password: string;
  passwordConfirmation: string;
}

const defaultValues = {
  name: '',
  email: '',
  registrationNumber: '',
  password: '',
  passwordConfirmation: ''
};

const SubjectForm = () => {
  const [validUF, setValidUF] = useState(Boolean);
  const {
    control,
    reset,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<AdminFormData>({ defaultValues });
  const token = useAppSelector(selectToken);

  const isValid = () => {
    setValidUF(true);
  };

  const addAdmin = (data: AdminFormData) => {
    const { password, email, registrationNumber, passwordConfirmation, name } =
      data;
    fetch('https://server-pae.azurewebsites.net/administrator/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      },
      body: JSON.stringify({
        user: {
          password,
          confirm_password: passwordConfirmation
        },
        registration_number: registrationNumber.toLowerCase(),
        email: email.toLowerCase(),
        name
      })
    })
      .then((res) => {
        const json = res.json();
        const { status } = res;

        return { data: json, status };
      })
      .then(
        (response: { data: Promise<{ detail: string }>; status: number }) => {
          if (
            response.status === 201 ||
            response.status === 200 ||
            response.status === 204
          ) {
            isValid();
            reset();
          } else {
            toast.error('No tienes permisos');
          }
        }
      )

      .catch((err) => {
        toast.error(err.message);
      });
  };

  const onSubmit = handleSubmit((data) => addAdmin(data));

  return (
    <form className={Styles.main} onSubmit={onSubmit}>
      <div className={Styles.input}>
        <TextInput
          style={{
            backgroundColor: '#FFFFFF',
            height: '15%',
            width: '100%',
            borderRadius: '5px',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          className={Styles.inblock}
          name="registrationNumber"
          placeholder="Matr??cula/N??mina*"
          control={control}
          error={errors.registrationNumber}
          rules={{
            required: 'Matr??cula o n??mina requerida',
            pattern: {
              value: /^([A,a,L,l]{1}[0-9]{8})/i,
              message: 'Correo el??ctronico inv??lido. E.g. A0XXXXXXX'
            }
          }}
        />
        <TextInput
          style={{
            backgroundColor: '#FFFFFF',
            height: '15%',
            width: '100%',
            borderRadius: '5px'
          }}
          className={Styles.inblock}
          name="name"
          placeholder="Nombre completo*"
          control={control}
          error={errors.name}
          rules={{
            required: 'Nombre completo requerido',
            minLength: {
              value: 3,
              message: 'El nombre debe tener al menos 3 caracteres'
            }
          }}
        />
        <TextInput
          style={{
            backgroundColor: '#FFFFFF',
            height: '15%',
            width: '100%',
            borderRadius: '5px'
          }}
          className={Styles.inblock}
          name="email"
          placeholder="Correo institucional*"
          control={control}
          error={errors.email}
          rules={{
            required: 'Correo el??ctr??nico requerido',
            pattern: {
              value: /^([A,a,L,l]{1}[0-9]{8}@tec\.mx)/i,
              message: 'Correo el??ctronico inv??lido. E.g. A0XXXXXXX@tec.mx'
            }
          }}
        />
        <Password
          style={{
            backgroundColor: '#FFFFFF',
            height: '15%',
            width: '100%',
            borderRadius: '5px'
          }}
          className={Styles.inblock}
          name="password"
          control={control}
          error={errors.password}
          rules={{
            required: 'Contrase??a requerida',
            minLength: { value: 8, message: 'Contrase??a muy corta' }
          }}
        />
        <TextInput
          style={{
            backgroundColor: '#FFFFFF',
            height: '15%',
            width: '100%',
            borderRadius: '5px'
          }}
          className={Styles.inblock}
          name="passwordConfirmation"
          type="password"
          placeholder="Confirmar contrase??a*"
          control={control}
          error={errors.passwordConfirmation}
          rules={{
            required: 'Confirmaci??n de contrase??a requerida',
            validate: (value) => value === getValues().password
          }}
        />
      </div>
      <div className={Styles.submitstyle}>
        <button className={Styles.button} type="submit">
          Agregar
        </button>
      </div>

      <AdminAdded visible={validUF} setVisible={setValidUF} />
    </form>
  );
};

export default SubjectForm;
