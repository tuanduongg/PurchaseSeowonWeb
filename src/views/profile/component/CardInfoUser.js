import {
  Avatar,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { ShowAlert, ShowQuestion } from 'utils/confirm';

const initValid = { err: false, msg: '' };

const CardInfoUser = () => {
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);

  const [validatePwNew, setValidatePWNew] = useState(initValid);
  const [validatePWCurren, setValidatePWCurrent] = useState(initValid);
  const [validatePWConfirm, setValidatePWConfirm] = useState(initValid);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleClickShowPassword = (type) => {
    switch (type) {
      case 'old':
        setShowPasswordCurrent((show) => !show);
        break;
      case 'new':
        setShowPasswordNew((show) => !show);
        break;
      case 'confirm':
        setShowPasswordConfirm((show) => !show);
        break;

      default:
        break;
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickSave = () => {
    let check = true;
    if (currentPassword?.length < 6) {
      check = false;
      setValidatePWCurrent({ err: true, msg: 'Current Password must be more than or equal 6 character!' });
    }
    if (newPassword?.length < 6) {
      check = false;
      setValidatePWNew({ err: true, msg: 'New Password must be more than or equal 6 character!' });
    }
    if (newPassword !== confirmPassword) {
      check = false;
      setValidatePWConfirm({ err: true, msg: 'Password Confirm not the same to New Password!' });
    }
    if (check) {
      ShowQuestion({
        content: 'Do you want to change password?',
        onClickYes: () => {
          alert('click yess');
        }
      });
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    switch (name) {
      case 'old':
        if (validatePWCurren?.err) {
          setValidatePWCurrent(initValid);
        }
        setCurrentPassword(value);
        break;
      case 'new':
        if (validatePwNew?.err) {
          setValidatePWNew(initValid);
        }
        setNewPassword(value);
        break;
      case 'confirm':
        if (validatePWConfirm?.err) {
          setValidatePWConfirm(initValid);
        }
        setConfirmPassword(value);
        break;

      default:
        break;
    }
  };
  return (
    <>
      <Card>
        <CardContent sx={{ padding: '10px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5}>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Avatar sx={{ width: '100px', height: '100px' }} variant="square">
                  A
                </Avatar>
                <Box sx={{ marginTop: '10px', textAlign: 'center' }}>
                  <Typography variant="h2">AdminIT</Typography>
                  <Typography variant="h5">인사/회계/전산(Per/Acc/IT)</Typography>
                  <Typography variant="subtitle">Manager</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Typography gutterBottom variant="h4" component="div">
                Change password
              </Typography>
              {/* <Divider /> */}
              <Box sx={{}}>
                <FormControl error={validatePWCurren?.err} fullWidth sx={{ m: 1 }} size="small" variant="outlined">
                  <InputLabel>Current password</InputLabel>
                  <OutlinedInput
                    name="old"
                    value={currentPassword}
                    required
                    placeholder="Please typing current password..."
                    type={showPasswordCurrent ? 'text' : 'password'}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            handleClickShowPassword('old');
                          }}
                          aria-label="toggle password visibility"
                          edge="end"
                        >
                          {showPasswordCurrent ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  {validatePWCurren?.err && <FormHelperText>{validatePWCurren?.msg}</FormHelperText>}
                </FormControl>

                <FormControl error={validatePwNew?.err} fullWidth sx={{ m: 1 }} size="small" variant="outlined">
                  <InputLabel>New password</InputLabel>
                  <OutlinedInput
                    name="new"
                    value={newPassword}
                    required
                    placeholder="Please typing new password..."
                    type={showPasswordNew ? 'text' : 'password'}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            handleClickShowPassword('new');
                          }}
                          aria-label="toggle password visibility"
                          edge="end"
                        >
                          {showPasswordNew ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  {validatePwNew?.err && <FormHelperText>{validatePwNew?.msg}</FormHelperText>}
                </FormControl>

                <FormControl error={validatePWConfirm?.err} fullWidth sx={{ m: 1 }} size="small" variant="outlined">
                  <InputLabel>Confirm password</InputLabel>
                  <OutlinedInput
                    name="confirm"
                    value={confirmPassword}
                    required
                    placeholder="Please typing confirm password..."
                    type={showPasswordConfirm ? 'text' : 'password'}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            handleClickShowPassword('confirm');
                          }}
                          aria-label="toggle password visibility"
                          edge="end"
                        >
                          {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  {validatePWConfirm?.err && <FormHelperText>{validatePWConfirm?.msg}</FormHelperText>}
                </FormControl>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button onClick={handleClickSave} variant="contained">
                    Save
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default CardInfoUser;
