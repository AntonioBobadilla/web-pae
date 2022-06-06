export interface DataTableProps {
  meetings: Meeting[];
  selectedItem: Column;
  setSelectedItem: (meeting: Column) => void;
}

export interface Column {
  col1: string;
  col2: string;
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
