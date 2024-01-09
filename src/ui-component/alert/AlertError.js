import { Alert, Slide, Snackbar } from '@mui/material';

const SlideTransition = (props) => {
  return <Slide {...props} direction="down" />;
};

const AlertError = ({ open, handleClose, content, vertical, horizontal, autoHideDuration }) => {
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
        autoHideDuration={autoHideDuration || null}
        open={open}
        TransitionComponent={SlideTransition}
      >
        <Alert severity={'error'} onClose={onClose}>
          {content}
        </Alert>
      </Snackbar>
      ;
    </>
  );
};
export default AlertError;
