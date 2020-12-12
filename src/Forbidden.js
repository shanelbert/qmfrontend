import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

function Forbidden(props) {
  return (
    <Grid container justify='center' alignContent='center' style={{ background: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant='h5' align='center'>{`Akun dengan peran '${props.role}' tidak dapat mengakses halaman ini`}</Typography>
    </Grid>
  )
}

export default Forbidden;
