import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';

interface IProps {
  href: string;
}

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

export const CommonLink: FunctionComponent<IProps> = (props) => {
  const { href, children } = props;
  const classes = useStyles();

  return (
    <a href={href} target={'_blank'} rel={'noopener noreferrer'} className={classes.link}>
      {children}
    </a>
  );
};
