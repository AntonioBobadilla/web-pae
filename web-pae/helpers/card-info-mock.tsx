import { History } from '../components/card-info/types';

const history: History[] = [
  {
    date: 'Lunes 21 de Marzo - 3:00 PM - 4:00 PM',
    subject: 'Programación orientada a objetos',
    student: 'Karen Rugerio Armenta',
    status: 'pending'
  },
  {
    date: 'Lunes 21 de Marzo - 3:00 PM - 4:00 PM',
    subject: 'Programación orientada a objetos',
    student: 'Karen Rugerio Armenta',
    status: 'pending'
  },
  {
    date: 'Lunes 21 de Marzo - 3:00 PM - 4:00 PM',
    subject: 'Programación orientada a objetos',
    student: 'Karen Rugerio Armenta',
    status: 'pending'
  },
  {
    date: 'Lunes 21 de Marzo - 3:00 PM - 4:00 PM',
    subject: 'Programación orientada a objetos',
    student: 'Karen Rugerio Armenta',
    status: 'pending'
  }
];
// eslint-disable-next-line import/prefer-default-export
export function HistoryMockService() {
  return history;
}
