const { Alert, Snackbar } = require('@mui/material');

import Slide from '@mui/material/Slide';

const SlideTransition = (props) => {
  return <Slide {...props} direction="down" />;
};

const getSx = (type) => {
  switch (type) {
    case 'error':
      return '#d32f2f';
    case 'success':
      return '#43a047';

    default:
      return '';
  }
};
const getAutoHideDuration = (autoHideDuration, type) => {
  if (!autoHideDuration) {
    switch (type) {
      case 'error':
        return null;
      case 'success':
        return 1500;

      default:
        return '';
    }
  }
  return autoHideDuration;
};

const CustomAlert = ({ handleClose, content, open, vertical, horizontal, severity, autoHideDuration, type }) => {
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
        autoHideDuration={getAutoHideDuration(autoHideDuration, type)}
        open={open}
        TransitionComponent={SlideTransition}
      >
        <Alert
          //{ backgroundColor: '#43a047', color: 'white', fontWeight: 'bold', '& .MuiAlert-icon': { color: 'white' } }
          sx={{ color: 'white', fontWeight: 'bold', '& .MuiAlert-icon': { color: 'white' }, backgroundColor: getSx(type) }}
          severity={severity || 'success'}
          onClose={onClose}
        >
          {content}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CustomAlert;
