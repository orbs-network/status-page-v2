import React, { useMemo, useState } from 'react';
import { TableCell, Tooltip, Typography } from '@material-ui/core';
import { HealthLevel } from '../../../shared/HealthLevel';
import { makeStyles } from '@material-ui/core/styles';
import WorkIcon from '@material-ui/icons/Work';
import AssignmentIcon from '@material-ui/icons/Assignment';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';
import HelpIcon from '@material-ui/icons/Help';
import { backgroundColorFromHealthLevel } from './statusTableUtils';

interface IProps {
  title: string;
  subTitle: string;
  healthLevel: HealthLevel;
  titleLink?: string;
  subTitleLink?: string;
  tooltip?: string;

  // Icons links
  statusLink?: string;
  logsLink?: string;
}

const useStyles = makeStyles((theme) => ({
  cell: {
    // DEV_NOTE : O.L : This 'borderRight:none' is a hack to prevent overflowX on large screens
    // TODO : O.L : Find a better solution
    border: '2px solid #06142e',
    borderRight: 'none',
    // boxSizing: 'border-box',
    width: 'fit-content',
    borderCollapse: 'collapse',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

export const StatusCell = React.memo<IProps>((props) => {
  const classes = useStyles();
  const { healthLevel, title, subTitle, tooltip, titleLink, subTitleLink, logsLink, statusLink } = props;
  const backgroundColor = backgroundColorFromHealthLevel(healthLevel);
  const truncatedTitle = useMemo(() => {
    return truncate(title);
  }, [title]);

  const titleComponent = useMemo(() => {
    let baseComponent = <Typography variant={'caption'}>{title}</Typography>;
    let finalComponent;

    if (titleLink) {
      finalComponent = (
        <a href={titleLink} target={'_blank'} rel={'noopener noreferrer'} className={classes.link}>
          {baseComponent}
        </a>
      );
    } else {
      finalComponent = baseComponent;
    }

    return finalComponent;
  }, [classes.link, title, titleLink]);

  const subTitleComponent = useMemo(() => {
    let baseComponent = <Typography variant={'caption'}>{subTitle}</Typography>;
    let finalComponent;

    if (subTitleLink) {
      finalComponent = (
        <a href={subTitleLink} target={'_blank'} rel={'noopener noreferrer'} className={classes.link}>
          {baseComponent}
        </a>
      );
    } else {
      finalComponent = baseComponent;
    }

    return finalComponent;
  }, [classes.link, subTitle, subTitleLink]);

  const statusIcon = useMemo(() => {
    if (statusLink) {
      return (
        // <Tooltip title={'Status'}>
        <a className={classes.link} href={statusLink} target={'_blank'} rel={'noopener noreferrer'}>
          <HelpIcon />
        </a>
        // </Tooltip>
      );
    } else {
      return null;
    }
  }, [classes.link, statusLink]);

  const logsIcon = useMemo(() => {
    if (logsLink) {
      return (
        // <Tooltip title={'Logs'}>
        <a className={classes.link} href={logsLink} target={'_blank'} rel={'noopener noreferrer'}>
          <AssignmentIcon />
        </a>
        // </Tooltip>
      );
    } else {
      return null;
    }
  }, [classes.link, logsLink]);

  // DEV_NOTE : O.L : maxWidth: 0 causes the cell to not expand over the width of the header cell (and so, allowing the ttuncation to work).
  return (
    <Tooltip title={tooltip || title} placement={'right'} arrow>
      <TableCell
        className={classes.cell}
        style={{ backgroundColor, overflowX: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '0px', textAlign: 'center' }}
      >
        {titleComponent}
        <br />
        {subTitleComponent}
        <br />
        {statusIcon}
        {logsIcon}
      </TableCell>
    </Tooltip>
  );
});

const TITLE_LENGTH = 10;
const truncate = (input: string) => (input.length > TITLE_LENGTH ? `${input.substring(0, TITLE_LENGTH)}...` : input);
