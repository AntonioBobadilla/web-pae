export const REGISTER = 'REGISTER';
export const SCHEDULE = 'SCHEDULE';
export const SUBJECTS = 'SUBJECTS';

export interface Step {
  title: string;
}

export interface Steps {
  [key: string]: Step;
}
