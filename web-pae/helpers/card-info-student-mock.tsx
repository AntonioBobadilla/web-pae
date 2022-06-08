import { Tutoring } from '../components/card-info-student/types';

const historystu: Tutoring[] = [
  {
    date: 'Viernes 27 de Mayo - 9:00 AM - 10:00 AM',
    subject: 'Programación Orientada a Objetos',
    student: 'Bryan González Arellano',
    location: 'https://itesm.zoom.us/j/5519309007',
    status: 'pending'
  },
  {
    date: 'Lunes 27 de Marzo - 3:00 PM - 4:00 PM',
    subject: 'Estructuras simbólicas en la imagen, la literatura y la música',
    student: 'Karen Rugerio Armenta',
    location: 'A1332',
    status: 'info'
  }
];
// eslint-disable-next-line import/prefer-default-export
export function HistoryStuMockService() {
  return historystu;
}
