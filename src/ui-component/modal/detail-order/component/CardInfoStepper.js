import { Box, Button, Card, CardActions, CardContent, Grid, Step, StepLabel, Stepper, Typography } from '@mui/material';

const steps = [
  {
    title: 'New',
    completed: true
  },
  {
    title: 'Waiting accept',
    completed: false
  },
  {
    title: 'Success',
    completed: false
  }
];
const isStepFailed = (step) => {
  console.log('step', step);
  return step?.level === 0;
};

const CardInfoStepper = ({ allStatus, orderSelect }) => {
  console.log('order select', orderSelect);
  return (
    <>
      <Card sx={{ height: '100%' }}>
        <CardContent sx={{ padding: '10px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'end', width: '100%', margin: '0px 0px 10px 0px' }}>
            <Typography variant="h5" color={'primary'}>
              Processing
            </Typography>
          </Box>

          <Stepper nonLinear alternativeLabel>
            {allStatus?.map((step, index) => {
              const labelProps = {};
              if (isStepFailed(step)) {
                labelProps.optional = (
                  <Typography variant="caption" color="error">
                    {orderSelect?.cancel_by}
                  </Typography>
                );
                labelProps.error = true;
              }
              return (
                <Step completed={step?.level <= orderSelect?.status.level ? true : false} key={index}>
                  <StepLabel {...labelProps}>{step.statusName}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </CardContent>
      </Card>
    </>
  );
};

export default CardInfoStepper;
