import React from 'react';
import {
  DataGrid,
  DataGridBody,
  DataGridRow,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  TableCellLayout,
  createTableColumn,
  Button,
} from '@fluentui/react-components';
import { OpenRegular, EditRegular, DeleteRegular } from '@fluentui/react-icons';

export default function TeamTable({ teams = [] }) { // Default value for teams prop
  const columns = [
    createTableColumn({
      columnId: 'teamName',
      renderHeaderCell: () => 'Team Name',
      renderCell: (item) => <TableCellLayout>{item.name}</TableCellLayout>,
    }),
    createTableColumn({
      columnId: 'description',
      renderHeaderCell: () => 'Description',
      renderCell: (item) => <TableCellLayout>{item.description}</TableCellLayout>,
    }),
    createTableColumn({
      columnId: 'actions',
      renderHeaderCell: () => 'Actions',
      renderCell: (item) => (
        <TableCellLayout
          media={
            <>
              <Button icon={<OpenRegular />} title="Open">Open</Button>
              <Button aria-label="Edit" icon={<EditRegular />} title="Edit"/>
              <Button aria-label="Delete" icon={<DeleteRegular />} title="Delete"/>
            </>
          }
        >
        </TableCellLayout>
      ),
    }),
  ];

  return (
    <DataGrid
      items={teams} // Passed teams as an array
      columns={columns}
      sortable
      getRowId={(item) => item.id.toString()}
    >
      <DataGridHeader>
        <DataGridRow>
          {({ renderHeaderCell }) => (
            <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody>
        {({ item, rowId }) => (
          <DataGridRow key={rowId}>
            {({ renderCell, columnId }) => (
              <DataGridCell>
                {renderCell(item)}
              </DataGridCell>
            )}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
};
