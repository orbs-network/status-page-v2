import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { Page } from '../components/structure/Page';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
    maxWidth:'500px',
    textAlign:'center',
  },

}));

export const Maintenance = () => {
  const classes = useStyles();
  return (
    <Page>
      <div className={classes.container}>
        <Box>
          <Typography className={classes.text}>Status page scheduled maintenance & upgrade, network is operational</Typography>
        </Box>
      </div>
    </Page>
  );
};
