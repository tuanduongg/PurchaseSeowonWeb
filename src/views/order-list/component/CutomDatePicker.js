import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CustomDatePicker = ({ label, disableFuture, value,onChange }) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          disableFuture={disableFuture}
          format="dd/MM/yyyy"
          slotProps={{ textField: { size: 'small', variant: 'standard', sx: { maxWidth: '110px' } } }}
          label={label}
          value={value}
          onChange={onChange}
        />
      </LocalizationProvider>
    </>
  );
};

export default CustomDatePicker;
