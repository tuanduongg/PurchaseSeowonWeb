// material-ui
import { Box, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import CardInfoUser from './component/CardInfoUser';

// ==============================|| SAMPLE PAGE ||============================== //

const ProfilePage = () => (
  <>
    <Box sx={{ width: { xs: '100%', md: '60%' }, margin: 'auto' }}>
      <CardInfoUser />
    </Box>
  </>
);

export default ProfilePage;
