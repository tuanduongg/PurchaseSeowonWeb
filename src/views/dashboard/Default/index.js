import { useEffect, useState } from 'react';

// material-ui
import { Grid, Typography } from '@mui/material';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography>Home</Typography>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
