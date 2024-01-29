import {
  Box,
  Button,
  CardMedia,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';
import { useEffect } from 'react';
import restApi from 'utils/restAPI';
import { DefineRouteApi } from 'DefineRouteAPI';
import TableDepartment from './component/TableDeparment';
import { ShowQuestion } from 'utils/confirm';

const initValidate = { err: false, msg: '' };

const formatPrice = (value) => {
  // Xóa các ký tự không phải số từ giá trị nhập vào
  const sanitizedValue = value.replace(/[^0-9]/g, '');

  // Kiểm tra xem giá trị sau khi xóa ký tự có bằng không hay không
  if (sanitizedValue !== '') {
    if (value) {
      const sanitizedValue = value.replace(/[^0-9]/g, '');

      // Chuyển định dạng số thành chuỗi có dấu phẩy ngăn cách hàng nghìn
      const formattedValue = new Intl.NumberFormat('en-US').format(parseInt(sanitizedValue, 10));

      return formattedValue.replace(',', '.');
    }
    return value;
  }
  return '';
};

const ModalDepartment = ({ open, handleClose, afterSave,fullScreen }) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [nameDepart, setNameDepart] = useState('');
  const [validateNameDepartment, setValidateNameDepartment] = useState(initValidate);

  const onClose = (e, reason) => {
    if (reason != 'backdropClick') {
      setSelectedRow(null);
      setNameDepart('');
      handleClose();
    }
  };

  const getAllDepart = async () => {
    const res = await restApi.get(DefineRouteApi.allDepartment);
    if (res?.status === 200) {
      setDepartments(res?.data);
    }
  };
  useEffect(() => {
    getAllDepart();
  }, []);
  const onChangeSelectedRow = (row) => {
    setSelectedRow(row);
    setNameDepart(row?.departName ?? '');
  };
  const handleSave = async () => {
    let data = {};
    let url = DefineRouteApi.addDepartment;
    let textSucces = '';
    if (selectedRow) {
      textSucces = 'Update department success!';
      data = { departID: selectedRow?.departID, departName: nameDepart };
      url = DefineRouteApi.updateDepartment;
    } else {
      textSucces = 'Add new department success!';
      data = { departName: nameDepart };
    }
    const res = await restApi.post(url, data);
    if (res?.status === 200) {
      if (!selectedRow) {
        setNameDepart('');
      }
      getAllDepart();
    }
    afterSave(res, textSucces);
  };
  const handleClickAdd = () => {
    if (nameDepart?.trim() === '') {
      setValidateNameDepartment({ err: true, msg: 'Department is required.' });
    } else {
      ShowQuestion({
        content: `Do you want to ${selectedRow ? 'update' : 'add new'} department?`,
        titleProp: 'Department',
        icon: 'warning',
        onClickYes: () => {
          handleSave();
        }
      });
    }
  };
  const handleClickDeleteRow = (row) => {
    alert(row?.departName ?? '');
  };

  return (
    <>
      <Dialog
      disableEscapeKeyDown={true}
        maxWidth={'sm'}
        sx={{ minHeight: '90vh' }}
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <DialogTitle fontSize={'20px'} sx={{ padding: '10px' }}>
            Department
          </DialogTitle>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <DialogContent>
          <Box sx={{ width: '100%', height: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <TextField
                  error={validateNameDepartment?.err}
                  helperText={validateNameDepartment?.msg}
                  onChange={(e) => {
                    if (validateNameDepartment?.err) {
                      setValidateNameDepartment(initValidate);
                    }
                    setNameDepart(e?.target?.value);
                  }}
                  sx={{ height: '100%' }}
                  fullWidth
                  placeholder="Typing your name of deparment..."
                  size="small"
                  value={nameDepart}
                  label="Department"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{ height: '40px' }}
                  size="medium"
                  variant="contained"
                  onClick={handleClickAdd}
                  color="primary"
                  autoFocus
                  endIcon={selectedRow ? <SaveIcon /> : <AddIcon />}
                >
                  {selectedRow ? 'Save' : `Add`}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TableDepartment
                  onClickDelete={handleClickDeleteRow}
                  selectedRow={selectedRow}
                  changeSelectedRow={onChangeSelectedRow}
                  listDepartment={departments}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        {/* <DialogActions>
          <Button size="small" variant="contained" color="primary" autoFocus endIcon={<SaveIcon />} onClick={handleClickSave}>
            Save
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
};

export default ModalDepartment;
