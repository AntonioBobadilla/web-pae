import React from 'react';
import styles from '../../css/components/dataTable.module.css';
import FormatTime from '../../helpers/format-time';
import { DataTableProps } from './types';

function DataTable({
  meetings,
  selectedItem,
  setSelectedItem
}: DataTableProps): JSX.Element {
  const tutors = React.useMemo(
    () => new Map(meetings.map((meeting, index) => [meeting.tutor, index + 1])),
    [meetings]
  );
  const data = React.useMemo(
    () =>
      meetings.map(
        (meeting) => ({
          col1: FormatTime(meeting.hour),
          col2: meeting.isOnline ? 'Virtual' : 'Presencial',
          col3: tutors.get(meeting.tutor)
        }),
        []
      ),
    [meetings, tutors]
  );

  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   useTable({ columns, data });

  return (
    <table className={styles.dataTable}>
      <thead className={styles.header}>
        <tr className={styles.row}>
          {/* {headerGroup.headers.map((column, index) => (
              <th
                {...column.getHeaderProps()}
                className={styles.cell}
                style={{
                  background: index === 0 ? 'white' : 'none',
                  border: 'none'
                }}
              >
                {column.render('Header')}
              </th>
            ))} */}
          <th className={styles.cell} style={{ backgroundColor: 'white' }}>
            {' '}
          </th>

          <th className={styles.cell}>MODALIDAD</th>
          <th className={styles.cell} style={{ backgroundColor: '#0277BD' }}>
            ASESOR
          </th>
        </tr>
      </thead>
      <tbody className={styles.body}>
        {meetings.map((row) => (
          <tr
            className={selectedItem === row ? styles.rowSelected : styles.row}
            onClick={() =>
              setSelectedItem(
                selectedItem === row
                  ? {
                      isOnline: false,
                      hour: 0,
                      tutor: '',
                      period: 0
                    }
                  : row
              )
            }
          >
            <td className={styles.cell} style={{ fontWeight: 'bold' }}>
              {FormatTime(row.hour)}
            </td>
            <td
              className={styles.cell}
              style={{
                borderRadius: 0,
                textAlign: 'center',
                padding: 0
              }}
            >
              {row.isOnline ? 'Virtual' : 'Presencial'}
            </td>
            <td className={styles.cell2}>{tutors.get(row.tutor)}</td>

            {/* {row.cells.map((cell, index) => (
              <td
                {...cell.getCellProps()}
                className={index === 0 ? styles.cell : styles.cell2}
              >
                {cell.render('Cell')}
              </td>
            ))} */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
