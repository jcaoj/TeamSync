import React from "react";
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  DocumentPdfRegular,
  VideoRegular,
  DeleteRegular,
} from "@fluentui/react-icons";
import {
  PresenceBadgeStatus,
  Avatar,
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  createTableColumn,
  Button,
} from "@fluentui/react-components";

const items = [
  {
    teamName: "Team 1",
    members: 12,
    creator: { name: "Eesa Ali", status: "available" },
  },
  {
    teamName: "Team 2",
    members: 15,
    creator: { name: "Eesa Ali", status: "available" },
  },
];

const columns = [
  createTableColumn({
    columnId: "teamName",
    renderHeaderCell: () => "Team Name",
    renderCell: (item) => (
      <TableCellLayout>{item.teamName}</TableCellLayout>
    ),
  }),

  createTableColumn({
    columnId: "members",
    renderHeaderCell: () => "Members",
    renderCell: (item) => (
      <TableCellLayout>{item.members}</TableCellLayout>
    ),
  }),

  createTableColumn({
    columnId: "creator",
    renderHeaderCell: () => "Creator",
    renderCell: (item) => (
      <TableCellLayout
        media={
          <Avatar
            aria-label={item.creator.name}
            name={item.creator.name}
            badge={{ status: item.creator.status }}
          />
        }
      >
        {item.creator.name}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "actions",
    renderHeaderCell: () => "Actions",
    renderCell: (item) => (
        <TableCellLayout
        media={
            <>
                <Button icon={<OpenRegular/>}>Open</Button>
                <Button aria-label="Edit" icon={<EditRegular/>}/>
                <Button aria-label="Delete" icon={<DeleteRegular/>}/>
            </>
        }
      >
      </TableCellLayout>
    ),
  }),
  
];

const getCellFocusMode = (columnId) => {
  switch (columnId) {
    case "singleAction":
      return "none";
    case "actions":
      return "group";
    default:
      return "cell";
  }
};

export const FocusableElementsInCells = () => {
    return (
      <DataGrid
        items={items}
        columns={columns}
        sortable
        getRowId={(item) => item.teamName}
        onSelectionChange={(e, data) => console.log(data)}
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
                <DataGridCell focusMode={getCellFocusMode(columnId)}>
                  {renderCell(item)}
                </DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    );
  };
  