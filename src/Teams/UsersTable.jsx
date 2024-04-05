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
  Avatar
} from '@fluentui/react-components';
import { OpenRegular, EditRegular, DeleteRegular } from '@fluentui/react-icons';
import "./Teams.css";
import axios from 'axios';

export default function UsersTable({ users = [], teamId }) {
  const images = require.context('../../server/public/images', true);

  const columns = [
    createTableColumn({
      columnId: 'username',
      renderHeaderCell: () => 'Username',
      renderCell: (item) => {
        try {
          return (<TableCellLayout>
            <Avatar name={item.username} size={24} image={{src: images(`./${item.profilePic}`)}}/>
            <div className='userName'>{item.username}</div>
          </TableCellLayout>)
        }
        catch (error) {
          return (<TableCellLayout>
            <Avatar name={item.username} size={24} />
            <div className='userName'>{item.username}</div>
          </TableCellLayout>)
        }
      },
    }),
    createTableColumn({
      columnId: 'added',
      renderHeaderCell: () => 'Added',
      renderCell: (item) => <TableCellLayout>
        {String(item.added).replace("T", " ").slice(0, -5)}
      </TableCellLayout>,
    })
  ];

  return (
    <DataGrid
      items={users}
      columns={columns}
      sortable
      getRowId={(item) => item && item.id ? item.id.toString() : 'fallback-id'}
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
