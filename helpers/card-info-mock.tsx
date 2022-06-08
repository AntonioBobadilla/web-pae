import { History } from '../components/card-info/types';

const history: History[] = [
  {
    date: 'Lunes 21 de Marzo - 3:00 PM - 4:00 PM',
    subject: 'Programación orientada a objetos',
    student: 'Karen Rugerio Armenta',
    status: 'pending'
  },
  {
    date: 'Martes 22 de Marzo - 3:00 PM - 4:00 PM',
    subject: 'Programación orientada a objetos',
    student: 'Karen Rugerio Armenta',
    status: 'info'
  },
  {
    date: 'Miercoles 23 de Marzo - 3:00 PM - 4:00 PM',
    subject: 'Programación orientada a objetos',
    student: 'Karen Rugerio Armenta',
    status: 'cancel'
  },
  {
    date: 'Viernes 24 de Marzo - 3:00 PM - 4:00 PM',
    subject: 'Programación orientada a objetos',
    student: 'Karen Rugerio Armenta',
    status: 'confirm'
  }
];
// eslint-disable-next-line import/prefer-default-export
export function HistoryMockService() {
  return history;
}
