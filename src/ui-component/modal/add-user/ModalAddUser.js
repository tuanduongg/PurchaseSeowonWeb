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

import { formattingVND, formattingVNDInput } from 'utils/helper';
import { IconShoppingCart } from '@tabler/icons';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';
import { useEffect } from 'react';
import restApi from 'utils/restAPI';
import { DefineRouteApi } from 'DefineRouteAPI';
import { ConfigPath } from 'routes/DefinePath';

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

const ModalAddUser = ({ open, handleClose, fullScreen, type, productProp, tittle, afterSaved, userSelect }) => {
  const [username, setUsername] = useState('');
  const [validateUserName, setValidateUserName] = useState(initValidate);
  const [department, setDepartment] = useState('');
  const [validateDepartment, setValidateDepartment] = useState(initValidate);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validateEmail, setValidateEmail] = useState(initValidate);
  const [validatePassword, setValidatePassword] = useState(initValidate);
  const [isManager, setIsManager] = useState(false);
  const [departments, setDepartments] = useState([]);

  const onClose = (e, reason) => {
    if (reason != 'backdropClick') {
      clearText();
      handleClose();
    }
  };
  const clearText = () => {
    setUsername('');
    setValidateUserName(initValidate);
    setDepartment('');
    setValidateDepartment(initValidate);
    setEmail('');
    setPassword('');
    setValidateEmail(initValidate);
    setValidatePassword(initValidate);
    setIsManager('');
  };
  useEffect(() => {
    if (userSelect) {
      setUsername(userSelect?.username);
      setEmail(userSelect?.email);
      setDepartment(userSelect?.department?.departID);
      setIsManager(userSelect?.isManager);
    }
  }, [userSelect]);

  const getAllDepart = async () => {
    const res = await restApi.get(DefineRouteApi.allDepartment);
    if (res?.status === 200) {
      setDepartments(res?.data);
    }
  };
  useEffect(() => {
    if (open) {
      getAllDepart();
    }
  }, [open]);

  const handleOnSave = async () => {
    const dataSend = {
      userID: userSelect?.userID,
      username,
      departmentID: department,
      email,
      password,
      isManager
    };
    const url = type === 'EDIT' ? DefineRouteApi.editUser : DefineRouteApi.addUser;
    const res = await restApi.post(url, dataSend);
    if (res?.status === 200) {
      clearText();
      handleClose();
    }
    afterSaved(res);
  };
  const handleClickSave = () => {
    let isErr = false;
    if (username?.trim() === '') {
      setValidateUserName({ err: true, msg: 'Username is required' });
      isErr = true;
    }
    if (username?.includes(' ')) {
      setValidateUserName({ err: true, msg: 'Username cannot contain space character' });
      isErr = true;
    }
    if (department?.trim() === '') {
      setValidateDepartment({ err: true, msg: 'Department is required' });
      isErr = true;
    }
    if (type === 'ADD') {
      if (password.includes(' ')) {
        setValidatePassword({ err: true, msg: 'Password cannot contain space character' });
      } else {
        if (password?.trim().length < 4) {
          setValidatePassword({ err: true, msg: 'Password must be more than or equal 4 character' });
          isErr = true;
        }
      }
    }

    if (!isErr) {
      handleOnSave();
    }
  };

  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    switch (name) {
      case 'username':
        if (validateUserName?.err) {
          setValidateUserName(initValidate);
        }
        setUsername(value);
        break;
      case 'department':
        if (validateDepartment?.err) {
          setValidateDepartment(initValidate);
        }
        setDepartment(value);
        break;
      case 'email':
        if (validateEmail?.err) {
          setValidateEmail(initValidate);
        }
        setEmail(value);
        break;
      case 'password':
        if (validatePassword?.err) {
          setValidatePassword(initValidate);
        }
        setPassword(value);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Dialog
        maxWidth={'sm'}
        sx={{ minHeight: '90vh' }}
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <DialogTitle fontSize={'20px'} sx={{ padding: '10px' }}>
            {tittle ?? 'user'}
          </DialogTitle>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <DialogContent sx={{ overflowY: 'hidden' }}>
          <Box sx={{ width: '100%', height: '100%' }}>
            {/* <Typography variant="h5" sx={{ marginBottom: '10px' }}>
              Info Product
            </Typography> */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={validateUserName.err}
                  helperText={validateUserName.msg}
                  InputProps={{ readOnly: type === 'VIEW' || type === 'EDIT' }}
                  fullWidth
                  value={username}
                  name="username"
                  onChange={handleChangeInput}
                  size="small"
                  label="Username"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl error={validateDepartment.err} size="small" fullWidth>
                  <InputLabel>Department</InputLabel>
                  <Select
                    InputProps={{ readOnly: type === 'VIEW' }}
                    value={department}
                    name="department"
                    onChange={handleChangeInput}
                    size="small"
                    label="Department"
                  >
                    {departments?.map((item, index) => (
                      <MenuItem key={index} disabled={type == 'VIEW' && item?.departID !== category} value={item?.departID}>
                        {item?.departName}
                      </MenuItem>
                    ))}
                  </Select>
                  {validateDepartment.err && <FormHelperText>{validateDepartment.msg}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={validateEmail.err}
                  helperText={validateEmail.msg}
                  InputProps={{ readOnly: type === 'VIEW' }}
                  fullWidth
                  name="email"
                  onChange={handleChangeInput}
                  value={email}
                  size="small"
                  type="text"
                  label="Email"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={validatePassword.err}
                  helperText={validatePassword.msg}
                  InputProps={{ readOnly: type === 'VIEW' }}
                  fullWidth
                  name="password"
                  onChange={handleChangeInput}
                  type="text"
                  size="small"
                  label="Password"
                  variant="outlined"
                  value={password}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  onChange={(e) => {
                    setIsManager(!isManager);
                  }}
                  checked={isManager}
                  control={<Checkbox />}
                  label="Manager department"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button size="small" variant="contained" color="primary" autoFocus endIcon={<SaveIcon />} onClick={handleClickSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalAddUser;
