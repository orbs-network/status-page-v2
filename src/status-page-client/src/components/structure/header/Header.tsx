/**
 * Copyright 2019 the orbs-ethereum-contracts authors
 * This file is part of the orbs-ethereum-contracts library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './logo-white.svg';
import { HEADER_HEIGHT_REM } from '../../../theme/Theme';
import { Typography } from '@material-ui/core';

export const HOVER_COLOR = '#16faff';

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: `${HEADER_HEIGHT_REM}rem`,
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    boxSizing: 'border-box',
    // height: `${HEADER_HEIGHT_REM}rem`,
    zIndex: theme.zIndex.drawer + 1,
    // padding: `${theme.spacing(2)}px ${theme.spacing(8)}px`,
    padding: theme.spacing(1),
  },
  logo: {
    width: 70,
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
  nav: {
    display: 'inherit',
    flexWrap: 'wrap',
  },
  toolbar: {
    paddingRight: 0,
    paddingLeft: 0,
    // marginRight: 'auto',
    // marginLeft: 'auto',
    margin: 'auto',
    width: '90%',
    maxWidth: '90%',
    justifyContent: 'space-between',
  },
  headerButtonsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 'auto',
    width: '90%',
    maxWidth: '90%',
  },
  displayInMetamaskButton: {
    marginRight: `${theme.spacing(3)}px`,
  },
  movedDown: {
    paddingTop: 48,
  },
  link: {
    color: '#ffffffb3',
    marginLeft: 30,
    transition: 'color 0.4s ease-in-out',
    '&:hover': {
      color: HOVER_COLOR,
    },
  },
}));

// TODO : O.L : Fix the snackbar hiding the header
export const Header = React.memo((props) => {
  const classes = useStyles();

  // TODO : Fix display with title
  return (
    <AppBar position="fixed" data-testid="header" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <NavLink to="/" style={{position: 'absolute'}}>
          <img className={classes.logo} src={logo} alt="Orbs" />
        </NavLink>
        <Typography variant="h2" className={classes.title}>
          Network Status
        </Typography>
      </Toolbar>
    </AppBar>
  );
});
