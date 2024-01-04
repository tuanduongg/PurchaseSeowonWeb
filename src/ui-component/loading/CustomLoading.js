const { Backdrop, CircularProgress } = require('@mui/material');

const CustomLoading = ({ open }) => {
  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default CustomLoading;
