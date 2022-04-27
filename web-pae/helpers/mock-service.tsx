import { Meeting } from '../components/data-table/types';

const meetings: Meeting[] = [
  {
    isOnline: true,
    date: '2020-05-01',
    hour: 10
  },
  {
    isOnline: false,
    date: '2020-05-01',
    hour: 11
  },
  {
    isOnline: true,
    date: '2020-05-01',
    hour: 12
  }
];
// eslint-disable-next-line import/prefer-default-export
export function MeetingsMockService() {
  return meetings;
}
