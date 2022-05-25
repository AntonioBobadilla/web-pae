import { HistoryStu } from '../components/card-info-student/types';

const historystu: HistoryStu[] = [
  {
    date: 'Lunes 27 de Marzo - 3:00 PM - 4:00 PM',
    subject: 'Estructuras simbólicas en la imagen, la literatura y la música',
    student: 'Karen Rugerio Armenta',
    location: 'https://itesm.zoom.us/j/5519309007',
    status: 'pending'
  }
];
// eslint-disable-next-line import/prefer-default-export
export function HistoryStuMockService() {
  return historystu;
}
