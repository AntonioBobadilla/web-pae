import React from 'react';
import { useTable } from 'react-table';
import styles from '../../css/components/dataTable.module.css';
import FormatTime from '../../helpers/format-time';
import { DataTableProps } from './types';

function DataTable({
  meetings,
  selectedItem,
  setSelectedItem
}: DataTableProps): JSX.Element {
  const columns = React.useMemo(
    () => [
      {
        Header: '',
        accessor: 'col1' // accessor is the "key" in the data
      },
      {
        Header: 'Modalidad',
        accessor: 'col2'
      }
    ],
    []
  );
  const data = React.useMemo(
    () =>
      meetings.map(
        (meeting) => ({
          col1: FormatTime(meeting.hour),
          col2: meeting.isOnline ? 'Virtual' : 'Presencial'
        }),
        []
      ),
    [meetings]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} className={styles.dataTable}>
      <thead className={styles.header}>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} className={styles.row}>
            {headerGroup.headers.map((column, index) => (
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
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className={styles.body}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              className={
                row.original === selectedItem ? styles.rowSelected : styles.row
              }
              onClick={() =>
                setSelectedItem(
                  selectedItem === row.original
                    ? { col1: '', col2: '' }
                    : row.original
                )
              }
            >
              {row.cells.map((cell, index) => (
                <td
                  {...cell.getCellProps()}
                  className={index === 0 ? styles.cell : styles.cell2}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default DataTable;
