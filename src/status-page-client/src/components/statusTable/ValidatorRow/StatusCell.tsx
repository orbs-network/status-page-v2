import React, { useMemo } from 'react';
import { TableCell, Tooltip, Typography } from '@material-ui/core';
import { HealthLevel } from '../../../shared/HealthLevel';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HelpIcon from '@material-ui/icons/Help';
import { backgroundColorFromHealthLevel } from '../../statusUtils';

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
    borderCollapse: 'collapse',
    overflowX: 'hidden', 
    textOverflow: 'ellipsis', 
    whiteSpace: 'nowrap', 
    textAlign: 'left'
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
  const titleComponent = useMemo(() => {
    let baseComponent = <Typography variant={'caption'}>{newlineCommas(title)}</Typography>;
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
        <Tooltip title={'Status'} arrow>
          <a className={classes.link} href={statusLink} target={'_blank'} rel={'noopener noreferrer'}>
            <HelpIcon />
          </a>
        </Tooltip>
      );
    } else {
      return null;
    }
  }, [classes.link, statusLink]);

  const logsIcon = useMemo(() => {
    if (logsLink) {
      return (
        <Tooltip title={'Logs'} arrow>
          <a className={classes.link} href={logsLink} target={'_blank'} rel={'noopener noreferrer'}>
            <AssignmentIcon />
          </a>
        </Tooltip>
      );
    } else {
      return null;
    }
  }, [classes.link, logsLink]);

  // DEV_NOTE : O.L : maxWidth: 0 causes the cell to not expand over the width of the header cell (and so, allowing the ttuncation to work).
  return (
    <Tooltip title={combineText(title, tooltip)} placement={'right'} arrow>
      <TableCell
        className={classes.cell}
        style={{ backgroundColor, maxWidth: isLongCell(title) ? '180px' : '0px', minWidth: isLongCell(title) ? '180px' : '0px' }}
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

const combineText = (title: string, tooltip?: string) => {
  if (!tooltip) return title;
  return <span>{tooltip}<br/><br/>{title}</span>;
}

const newlineCommas = (input : string) => {
  const arr = input.split(', ');
  if (arr.length === 1) return input;
  return arr.map((text, i) => <span key={i} style={{fontSize: '0.8rem'}}>{text}{i !== arr.length-1 ? <br/> : false}</span>)
};

// should the cell be short or long
const isLongCell = (title : string) => {
  const lc = title.toLowerCase();
  if (lc === 'ok') return false;
  if (lc === 'started') return false;
  return true;
}