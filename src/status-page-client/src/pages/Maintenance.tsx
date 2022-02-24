import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import maitenanceImage from '../assets/images/maitenance.png';

const useStyles = makeStyles((theme) => ({
  screen: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    background: 'black',
    padding: '0px 20px',
  },
  text: {
    fontSize: 18,
    color: 'white',
    maxWidth: 350,
    textAlign: 'center',
    marginTop: 30,
    fontWeight: 400,
  },
  image: {
    width: 180,
  },
}));

export const Maintenance = () => {
  const classes = useStyles();
  return (
    <div className={classes.screen}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <img src={maitenanceImage} alt="maitenance" className={classes.image} />
        <Typography className={classes.text}>{`Status page scheduled maintenance &  upgrade network is operational`}</Typography>
      </Box>
    </div>
  );
};
