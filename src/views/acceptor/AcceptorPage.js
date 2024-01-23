// material-ui
import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { useState } from 'react';
import CustomLoading from 'ui-component/loading/CustomLoading';
import Loader from 'ui-component/Loader';
import PersonIcon from '@mui/icons-material/Person';
import styled from '@emotion/styled';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

// ==============================|| SAMPLE PAGE ||============================== //
const steps = ['Manager department', 'Mr.Jung', 'Mr.Song', 'Mr.Tinh'];

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)'
  })
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  //   const icons = {
  //     1: <PersonIcon />,
  //     2: <PersonIcon />,
  //     3: <PersonIcon />
  //   };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      <PersonIcon />
    </ColorlibStepIconRoot>
  );
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1
  }
}));
const AcceptorPage = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Box sx={{ width: { xs: '100%', md: '60%' }, margin: 'auto' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          List acceptor
        </Typography>
        <Stepper alternativeLabel activeStep={1} connector={<ColorlibConnector />}>
          {steps.map((label,index) => (
            <Step
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                alert('click');
              }}
              completed={true}
              key={label}
            >
              <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      {loading && <Loader />}
      <CustomLoading open={loading} />
    </>
  );
};

export default AcceptorPage;
