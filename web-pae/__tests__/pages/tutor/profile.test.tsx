import CardInfo from '@/components/card-info';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { HistoryMockService } from 'helpers/card-info-mock';
import React from 'react';

describe('Tutor Profile', () => {
  it('renders tutor profile page unchanged', () => {
    const mockService = HistoryMockService();
    const { container } = render(
      <>
        {mockService.map((historyItem) => (
          <CardInfo
            date={historyItem.date}
            subject={historyItem.subject}
            student={historyItem.student}
            status={historyItem.status}
            key={historyItem.date}
          />
        ))}
      </>
    );
    expect(container).toMatchSnapshot();
  });
});
