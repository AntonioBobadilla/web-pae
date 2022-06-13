import { Subject } from '../search-bar';

export interface HistoryStuProps {
  historystu: Tutoring[];
}

export interface Student {
  email: string;
  is_active: boolean;
  major: string;
  name: string;
  registration_number: string;
  user: string;
}

export interface Tutor {
  email: string;
  is_active: boolean;
  major: string;
  name: string;
  registration_number: string;
  user: string;
}

export interface TutorObject extends Tutor {
  subjects: {
    subject: string;
  }[];
  completed_hours: number;
  has_feeback: boolean;
}

export interface Tutoring {
  date: string;
  doubt: string;
  file: string;
  hour: number;
  id: number;
  is_online: boolean;
  place: string;
  student: Student;
  subject: Subject;
  topic: string;
  status: string;
  tutor: Tutor;
  has_feeback: boolean;
}
