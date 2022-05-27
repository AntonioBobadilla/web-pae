import React from 'react';
import { ProgressMockService } from '../helpers/progress-bar-mock';
import ProgressBarH from './progress-bar-hours';
import { Progress } from './progress-bar/types';

const ProgressInformation = () => {
  const [progress, setProgress] = React.useState<Progress[]>(
    ProgressMockService()
  );
  return progress.map((progress) => (
    <ProgressBarH
      progress={progress.tutorProgress}
      total={progress.total}
      key={progress.tutorProgress}
    />
  ));
};

export default ProgressInformation;
