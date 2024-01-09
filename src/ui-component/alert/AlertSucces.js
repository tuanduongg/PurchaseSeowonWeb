import { Alert, Slide, Snackbar } from '@mui/material';
import MainAlert from './CustomAlert';
const SlideTransition = (props) => {
  return <Slide {...props} direction="down" />;
};

const AlertSuccess = ({ open, handleClose, content, vertical, horizontal, autoHideDuration }) => {
  const onClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    handleClose();
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: vertical || 'top', horizontal: horizontal || 'center' }}
        onClose={onClose}
        autoHideDuration={autoHideDuration || 1500}
        open={open}
        TransitionComponent={SlideTransition}
      >
        <Alert
          sx={{ backgroundColor: '#43a047', color: 'white', fontWeight: 'bold', '& .MuiAlert-icon': { color: 'white' } }}
          severity={'success'}
          onClose={onClose}
        >
          {content}
        </Alert>
      </Snackbar>
      ;
    </>
  );
};
export default AlertSuccess;
