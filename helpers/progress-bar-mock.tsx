import { Progress } from '../components/progress-bar/types';

const progress: Progress[] = [
  {
    tutorProgress: 50,
    total: 140
  }
];
// eslint-disable-next-line import/prefer-default-export
export function ProgressMockService() {
  return progress;
}
