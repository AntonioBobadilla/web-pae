import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { useAppSelector } from 'store/hook';
import { selectRegisterData } from 'store/reducers/create-tutor';
import styles from '../css/components/registerForm.module.css';
import ButtonTemplate from './button-template';
import Password from './password';
import TextInput from './text-input';

interface RegisterFormProps {
  nextStep: (data: StudentRegisterData) => void;
  student: boolean;
  isLoading: boolean;
}

export type StudentRegisterData = {
  name: string;
  email: string;
  major: string;
  password: string;
  passwordConfirmation: string;
};

export const studentRegisterDefaultValue: StudentRegisterData = {
  email: '',
  password: '',
  major: '',
  name: '',
  passwordConfirmation: ''
};

const RegisterForm = ({ nextStep, student, isLoading }: RegisterFormProps) => {
  const tutorDefaultValues = useAppSelector(selectRegisterData);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<StudentRegisterData>({
    defaultValues: student ? studentRegisterDefaultValue : tutorDefaultValues
  });
  const { t } = useTranslation('tutor-registration');


  // TODO: DELETE DATA ON NAVIGATE CHANGED
  // const { isDirty } = useFormState({ control });

  const onSubmit = handleSubmit((data) => nextStep(data));

  return (
    <form className={styles.registerForm} onSubmit={onSubmit}>
      <div className={styles.input}>
        <TextInput
          name="name"
          placeholder={t('FULL NAME*')}
          control={control}
          error={errors.name}
          rules={{
            required: t('Full name required'),
            minLength: {
              value: 3,
              message: t('The name must contain at least 3 characters')
            }
          }}
        />
      </div>
      <div className={styles.input}>
        <TextInput
          name="email"
          placeholder={t('INSTITUTIONAL EMAIL*')}
          control={control}
          error={errors.email}
          rules={{
            required: t('Required email'),
            pattern: {
              value: /^([A,a]{1}[0]{1}[0-9]{7}@tec\.mx)/i,
              message: t('Invalid email. E.g. A0XXXXXXX@tec.mx')
            }
          }}
        />
      </div>
      <div className={styles.input}>
        <TextInput
          name="major"
          placeholder={t('MAJOR*')}
          control={control}
          error={errors.major}
          style={{ textTransform: 'uppercase' }}
          rules={{
            required: t('Major required'),
            pattern: {
              value: /^[A-Za-z]{2,4}$/,
              message: t('Invalid major. E.g. ARQ, LAD, MEC')
            }
          }}
        />
      </div>

      <div className={styles.input}>
        <Password
          name="password"
          control={control}
          error={errors.password}
          rules={{
            required: t('Password required'),
            minLength: { value: 8, message: t('Password too short') }
          }}
        />
      </div>
      <div className={styles.input}>
        <TextInput
          name="passwordConfirmation"
          type="password"
          placeholder={t('CONFIRM PASSWORD')}
          control={control}
          error={errors.passwordConfirmation}
          rules={{
            required: t('Password confirmation required'),
            validate: (value) => value === getValues().password
          }}
        />
      </div>
      <div className={styles.button}>
        <ButtonTemplate
          variant="primary"
          disabled={isLoading}
          loading={isLoading}
          type="submit"
        >
          {student ? t('FINISH REGISTER') : t('CONTINUE WITH REGISTER')}
        </ButtonTemplate>
      </div>
    </form>
  );
};

export default RegisterForm;
