export interface DataTableProps {
  meetings: AvailableTutoring[];
  selectedItem: AvailableTutoring;
  setSelectedItem: (meeting: AvailableTutoring) => void;
}

export interface Column {
  col1: string;
  col2: string;
}

export interface AvailableTutoring {
  isOnline: boolean;
  period: number;
  hour: number;
  tutor: string;
}

export interface Meeting {
  date: string;
  tutorings: AvailableTutoring[];
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
