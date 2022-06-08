import CardInfoStu from '@/components/card-info-student';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { HistoryStuMockService } from 'helpers/card-info-student-mock';
import React from 'react';

describe('Student Profile', () => {
  it('renders admin profile page unchanged', () => {
    const mockService = HistoryStuMockService();
    const { container } = render(
      <>
        {mockService.map((historyItem) => (
          <CardInfoStu
            date={historyItem.date}
            subject={historyItem.subject}
            topic={historyItem.location}
            location={historyItem.location}
            status={historyItem.status}
            key={historyItem.date}
          />
        ))}
      </>
    );
    expect(container).toMatchSnapshot();
  });
});
