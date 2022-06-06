import { Subject } from '@/components/search-bar';

export const days: {
  [key: string]: number;
} = {
  lunes: 0,
  martes: 1,
  miercoles: 2,
  jueves: 3,
  viernes: 4,
  sabado: 5
};

export interface Period {
  dia: string;
  inicio: number;
  fin: number;
  id: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}

// Define a type for the slice state
export interface CreateTutorState {
  name: string;
  email: string;
  major: string;
  password: string;
  passwordConfirmation: string;
  schedule: {
    firstPeriod: Period[];
    secondPeriod: Period[];
    thirdPeriod: Period[];
  };
  subjects: Subject[];
  isLoading: boolean;
  error: string;
}
