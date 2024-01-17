import { Box, Button, Card, CardActions, CardContent, Grid, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';

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
const checkComplete = () => {};
const isStepFailed = (step) => {
  return step?.level === 0;
};

const CardInfoStepper = ({ allStatus, orderSelect, maxLevel }) => {
  const [listStatus, setListStatus] = useState(allStatus ?? []);
  console.log('order select', orderSelect);
  useEffect(() => {
    if (orderSelect) {
      if (orderSelect?.status.level === 0) {
        const arrNew = listStatus.filter((item, index) => {
          return item?.level === 0 || item?.level === 1;
        });
        setListStatus(arrNew);
      }
    }
  }, [orderSelect]);

  return (
    <>
      <Card sx={{ height: '100%' }}>
        <CardContent sx={{ padding: '10px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'end', width: '100%', margin: '0px 0px 10px 0px' }}>
            <Typography variant="h5" color={'primary'}>
              Order status
            </Typography>
          </Box>

          <Stepper nonLinear alternativeLabel>
            {listStatus?.map((step, index) => {
              const labelProps = {};
              if (isStepFailed(step)) {
                labelProps.optional = (
                  <Typography variant="caption" color="error">
                    by {orderSelect?.cancel_by}
                  </Typography>
                );
                labelProps.error = true;
              }
              if (step?.level === 0 && orderSelect?.status.level !== 0) {
                return null;
              } else {
                return (
                  <Step completed={step?.level <= orderSelect?.status.level ? true : false} key={index}>
                    <StepLabel {...labelProps}>{step.statusName}</StepLabel>
                  </Step>
                );
              }
            })}
          </Stepper>
        </CardContent>
      </Card>
    </>
  );
};

export default CardInfoStepper;
