import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useState } from 'react';
import ProductEmpty from 'ui-component/ProductEmpty';

const columns = [
  {
    id: 'STT',
    label: 'STT',
    // minWidth: 170,
    align: 'center'
  },
  {
    id: 'name',
    label: 'Department',
    // minWidth: 170,
    align: 'left'
  }
];

const TableCategory = ({ listCategory, changeSelectedRow, selectedRow, onClickDelete }) => {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(+event.target.value);
  };
  return (
    <>
      <Box sx={{ backgroundColor: 'white' }}>
        <TableContainer sx={{ height: '350px' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {listCategory?.length > 0 ? (
                listCategory.map((row, index) => {
                  return (
                    <TableRow
                      sx={{
                        '&.Mui-selected': { backgroundColor: '#3641524f' },
                        '&.Mui-selected:hover': {
                          backgroundColor: '#3641524f'
                        }
                      }}
                      selected={row?.categoryID === selectedRow?.categoryID}
                      onClick={() => {
                        if (selectedRow?.categoryID === row?.categoryID) {
                          changeSelectedRow(null);
                        } else {
                          changeSelectedRow(row);
                        }
                      }}
                      //   hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.categoryID}
                    >
                      <TableCell sx={{ padding: '5px', textAlign: 'center' }}>{index + 1}</TableCell>
                      <TableCell sx={{ padding: '5px', textAlign: 'left' }}>{row?.categoryName}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={columns?.length + 1}>
                    <ProductEmpty />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default TableCategory;
