import React, { useEffect, useState } from 'react';
import './style.css';
import { HEADER_HEIGHT_REM } from '../theme/Theme';
import { Route, Switch } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Header } from '../components/structure/header/Header';
import { StatusPage } from '../pages/StatusPage';
import { Maintenance } from '../pages/Maintenance';
import useLogic from './useLogic';
import LoadingPage from '../pages/LoadingPage';

const useStyles = makeStyles((theme) => ({
  appMain: {
    height: '100%',
    boxSizing: 'border-box',
    padding: '2em',
    display: 'inline-block',
  },
  headerSeparator: {
    height: `${HEADER_HEIGHT_REM}rem`,
  },
  mainWrapper: {
    backgroundColor: '#06142e',
    backgroundRepeat: 'repeat-y',
    backgroundImage: 'url(https://www.orbs.com/wp-content/uploads/2019/02/technology-background1.png)',
    backgroundAttachment: 'scroll',
    backgroundPosition: 'top center',
    // minHeight: `calc(100% - ${HEADER_HEIGHT_REM}rem)`,
    minHeight: `calc(100% - ${HEADER_HEIGHT_REM}rem)`,
    display: 'block',
    // Center the content
    textAlign: 'center',
  },
}));

const App = React.memo(() => {
  const classes = useStyles();
  const { underMaitenance, isLoading } = useLogic();

  if (isLoading) {
    return <LoadingPage />;
  }
  if (underMaitenance) {
    return <Maintenance />;
  }

  return (
    <>
      <Header />
      <div className={classes.headerSeparator} />
      <div className={classes.mainWrapper}>
        <main className={classes.appMain}>
          <Switch>
            <Route exact path="/" component={StatusPage} />
          </Switch>
        </main>
      </div>
    </>
  );
});

export default App;
