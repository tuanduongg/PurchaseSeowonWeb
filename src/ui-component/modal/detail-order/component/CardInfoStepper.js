import { Box, Button, Card, CardActions, CardContent, Grid, Step, StepLabel, Stepper, Typography } from '@mui/material';

const steps = [
  {
    title: 'Ordered',
    completed: true
  },
  {
    title: 'Shipping',
    completed: true
  },
  {
    title: 'Successfull',
    completed: false
  }
];
const CardInfoStepper = () => {
  return (
    <>
      <Card sx={{ height: '100%' }}>
        <CardContent sx={{ padding: '10px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'end', width: '100%', margin: '0px 0px 10px 0px' }}>
            <Typography variant="h5" color={'primary'}>
              Shipping
            </Typography>
          </Box>

          <Stepper nonLinear alternativeLabel>
            {steps.map((step, index) => (
              <Step completed={step?.completed} key={index}>
                <StepLabel>{step.title}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>
    </>
  );
};

export default CardInfoStepper;
