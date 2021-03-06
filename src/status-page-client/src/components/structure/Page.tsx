import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

interface IProps {}

const useStyles = makeStyles((theme) => ({
  page: {
    height: '100%',
    boxSizing: 'border-box',
  },
}));

export const Page = React.memo<IProps>((props) => {
  const classes = useStyles();
  const { children } = props;
  return <div className={classes.page}>{children}</div>;
});
