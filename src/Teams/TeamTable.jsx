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
import {useNavigate } from "react-router-dom";

export default function TeamTable({ teams = [] }) { 

  const navigate = useNavigate();

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
      items={teams} 
      columns={columns}
      sortable
      getRowId={(item) => item && item.id ? item.id.toString(): 'fallback-id'}
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
          <DataGridRow key={rowId} onClick={() => navigate(`/viewTeam/${item.id}`)}>
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
