import React from 'react';
import './App.css';
import { HEADER_HEIGHT_REM } from './theme/Theme';
import { Route, RouteProps, Switch } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Header } from './components/structure/header/Header';
import { StatusPage } from './pages/StatusPage';

const useStyles = makeStyles((theme) => ({
  appMain: {
    height: '100%',
    maxWidth: '90%',
    boxSizing: 'border-box',
    padding: theme.spacing(2),
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

    // Center the content
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const App = React.memo(() => {
  const classes = useStyles();
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
