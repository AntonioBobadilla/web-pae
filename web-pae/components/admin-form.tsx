import { useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import Styles from '../css/components/adminForm.module.css';
import AdminAdded from './dialogs/admin-added';
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

  const isValid = () => {
    setValidUF(true);
  };

  const addAdmin = (data: AdminFormData) => {
    const { password, email, registrationNumber, passwordConfirmation, name } =
      data;
    fetch('http://server-pae.azurewebsites.net/administrator/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: {
          password: password,
          confirm_password: passwordConfirmation
        },
        registration_number: registrationNumber,
        email: email,
        name: name
      })
    })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error('could not make PUT request for that endpoint');
        }
        isValid();
        reset();

        return res.json();
      })
      .then((data) => {
        console.log('ok');
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const {
    control,
    reset,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<AdminFormData>({ defaultValues });

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
          placeholder="Matrícula/Nómina*"
          control={control}
          error={errors.registrationNumber}
          rules={{
            required: 'Matrícula requerida',
            pattern: {
              value: /^([A,a]{1}[0]{1}[0-9]{7})/i,
              message: 'Correo eléctronico inválido. E.g. A0XXXXXXX'
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
            required: 'Correo eléctrónico requerido',
            pattern: {
              value: /^([A,a]{1}[0]{1}[0-9]{7}@tec\.mx)/i,
              message: 'Correo eléctronico inválido. E.g. A0XXXXXXX@tec.mx'
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
          name="password"
          type="password"
          placeholder="Contraseña*"
          control={control}
          error={errors.password}
          rules={{
            required: 'Contraseña requerida',
            minLength: { value: 8, message: 'Contraseña muy corta' },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/i,
              message:
                'Contraseña inválida. Debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial'
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
          name="passwordConfirmation"
          type="password"
          placeholder="Confirmar contraseña*"
          control={control}
          error={errors.passwordConfirmation}
          rules={{
            required: 'Confirmación de contraseña requerida',
            validate: (value) => value === getValues().password
          }}
        />
      </div>

      <button className={Styles.button} type="submit">
        Agregar
      </button>
      <AdminAdded visible={validUF} setVisible={setValidUF}></AdminAdded>
    </form>
  );
};

export default SubjectForm;
