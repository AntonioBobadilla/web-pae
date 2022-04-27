export interface DataTableProps {
  meetings: Meeting[];
}

export interface Meeting {
  isOnline: boolean;
  date: string;
  hour: number;
}

export interface Tutoring {
  idTutoring: number;
  registrationNumberTutor: string;
  registrationNumberTutee: string;
  date: number;
  hour: number;
  subjectCode: string;
  status: string;
  isOnline: boolean;
  place: string;
  topic: string;
  doubt: string;
  file: string;
}
