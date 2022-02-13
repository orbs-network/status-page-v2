import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Page } from '../components/structure/Page';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  spinner: {
    color: 'white',
  },
}));

function LoadingPage() {
  const classes = useStyles();
  return (
    <Page>
      <Box margin="auto" display="flex" alignItems="center" justifyContent="center" width="100%" height="100%">
        <CircularProgress className={classes.spinner} size={100} />
      </Box>
    </Page>
  );
}

export default LoadingPage;
