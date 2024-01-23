import { Box, Button, Card, CardActions, CardContent, Grid, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { max } from 'date-fns';
import { useEffect } from 'react';
import { useState } from 'react';

// 1:new
// 2,3,4,5,6: waiting accept
//7:success
const steps = [
  {
    title: 'New',
    value: [1],
    complete: true
  },
  {
    title: 'Waiting accept',
    value: [],
    complete: false
  },
  {
    title: 'Success',
    value: [],
    complete: false
  }
];
const stepCancel = [
  {
    title: 'New',
    value: [1],
    complete: true
  },
  {
    title: 'Cancel',
    value: [0],
    complete: true
  }
];
const checkComplete = () => {};
const isStepFailed = (step) => {
  return step?.value?.includes(0);
};

const CardInfoStepper = ({ allStatus, orderSelect }) => {
  // const [listStatus, setListStatus] = useState(allStatus ?? []);
  const [listStep, setListStep] = useState(steps);
  // useEffect(() => {
  //   if (orderSelect) {
  //     if (orderSelect?.status.level === 0) {
  //       const stepRs = steps.filter((item, index) => {
  //         return item?.level.includes(1);
  //       });
  //       setListStep([...stepRs, stepCancel]);
  //     } else {
  //       setListStep(steps);
  //     }
  //   }
  // }, [orderSelect]);

  useEffect(() => {
    if (allStatus) {
      if (orderSelect?.status?.level === 0) {
        setListStep(stepCancel);
      } else {
        const arrWating = [];
        let maxLevel = -1;
        const data = allStatus.map((item, index) => {
          if (item?.level >= 1) {
            if (item?.level > maxLevel) {
              maxLevel = item?.level;
            }
            arrWating.push(item?.level);
          }
        });
        const listNew = steps;


        listNew[1].value = arrWating.filter((item) => item !== maxLevel);
        const currentLevel = orderSelect?.status?.level;
        if (currentLevel === 1) {
          listNew[0].complete = true;
          listNew[1].complete = false;
          listNew[2].complete = false;
        } else if (currentLevel > 1 && currentLevel < maxLevel) {
          listNew[0].complete = true;
          listNew[1].complete = true;
          listNew[2].complete = false;
        } else {
          listNew[0].complete = true;
          listNew[1].complete = true;
          listNew[2].value = [maxLevel];
          listNew[2].complete = true;
        }
        console.log('list new after', listNew);
        setListStep(listNew);
      }
    }
  }, [allStatus, orderSelect]);

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
            {listStep?.map((step, index) => {
              const labelProps = {};
              if (isStepFailed(step)) {
                labelProps.optional = (
                  <Typography variant="caption" color="error">
                    by {orderSelect?.cancel_by}
                  </Typography>
                );
                labelProps.error = true;
              }
              // if (step?.level === 0 && orderSelect?.status.level !== 0) {
              //   return null;
              // } else {
              //   return (
              //     <Step completed={step?.value?.includes(orderSelect?.status.level)} key={index}>
              //       <StepLabel {...labelProps}>{step.title}</StepLabel>
              //     </Step>
              //   );
              // }
              return (
                <Step completed={step?.complete} key={index}>
                  <StepLabel {...labelProps}>{step.title}</StepLabel>
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
