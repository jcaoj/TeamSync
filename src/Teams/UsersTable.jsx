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

  function removeUserFromTeam(userId) {
    axios.post(`http://localhost:8081/removeUserFromTeam?userId=${userId}&teamId=${teamId}`)
      .then(res =>  {console.log(res)})
      .catch(err => console.log(err));
      
  }

  const columns = [
    createTableColumn({
      columnId: 'username',
      renderHeaderCell: () => 'Username',
      renderCell: (item) => <TableCellLayout>
        <Avatar name={item.username} size={24} /> <div className='userName'>{item.username}</div>
        </TableCellLayout>,
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
