import { Meeting } from '../components/data-table/types';

const meetings: Meeting[] = [
  {
    isOnline: false,
    date: '2020-05-05',
    hour: 11
  },
  {
    isOnline: true,
    date: '2020-05-06',
    hour: 12
  },
  {
    isOnline: true,
    date: '2020-05-07',
    hour: 13
  },
  {
    isOnline: true,
    date: '2020-05-08',
    hour: 14
  },
  {
    isOnline: true,
    date: '2020-05-09',
    hour: 15
  },
  {
    isOnline: true,
    date: '2020-05-10',
    hour: 16
  }
];
// eslint-disable-next-line import/prefer-default-export
export function MeetingsMockService() {
  return meetings;
}
