import React, { useMemo } from 'react';
import { TableCell, Tooltip, Typography } from '@material-ui/core';
import { HealthLevel } from '../../../shared/HealthLevel';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HelpIcon from '@material-ui/icons/Help';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import { backgroundColorFromHealthLevel } from '../../statusUtils';

interface IProps {
  serviceName: string;
  title: string;
  subTitle: string;
  healthLevel: HealthLevel;
  titleLink?: string;
  subTitleLink?: string;
  tooltip?: string;

  // Icons links
  statusLink?: string;
  logsLink?: string;
  metricsLink?: string;
  statusSpec?: { [key: string]: string };
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
    textAlign: 'left',
    padding: '8px',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  spec: {
    listStyleType: 'unset',
    display: 'flex',
    width: '100%',
    padding: 0,
    flexDirection: 'column',
    gap: 10,
  },
  specItem: {
    listStyleType: 'unset',
    display: 'flex',
    width: '100%',
    gap: 20,
  },
  specItemName: {},
  specItemValue: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    flex: 1,
  },
}));

export const StatusCell = React.memo<IProps>((props) => {
  const classes = useStyles();
  const {serviceName, healthLevel, title, subTitle, tooltip, titleLink, subTitleLink, logsLink, metricsLink, statusLink, statusSpec } = props;
  const backgroundColor = backgroundColorFromHealthLevel(healthLevel, !serviceName || !serviceName.startsWith('vm-'));
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
    let baseComponent = (
      <Typography variant={'caption'} style={{ lineHeight: '25px', borderBottom: '1px dotted #ddd' }}>
        {subTitle}
      </Typography>
    );
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

  console.log(statusSpec);

  const renderStatusSpec = useMemo(() => {
    if (statusSpec) {
      return (
        <ul className={classes.spec}>
          {Object.keys(statusSpec).map(function (key) {
            return (
              <li key={key} className={classes.specItem}>
                 <Typography className={classes.specItemName}>{key}:</Typography>
                    <Typography className={classes.specItemValue}>{statusSpec[key]}</Typography>
              </li>
            );
          })}
        </ul>
      );
    }
    return null;
  }, [statusSpec, classes.spec, classes.specItem, classes.specItemName, classes.specItemValue]);

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

  const metricsIcon = useMemo(() => {
    if (metricsLink) {
      return (
        <Tooltip title={'Metrics'} arrow>
          <a className={classes.link} href={metricsLink} target={'_blank'} rel={'noopener noreferrer'}>
            <InsertChartIcon />
          </a>
        </Tooltip>
      );
    } else {
      return null;
    }
  }, [classes.link, metricsLink]);

  // DEV_NOTE : O.L : maxWidth: 0 causes the cell to not expand over the width of the header cell (and so, allowing the ttuncation to work).
  return (
    <Tooltip title={combineText(title, tooltip)} placement={'right'} arrow>
      <TableCell
        className={classes.cell}
        style={{ backgroundColor, maxWidth: isLongCell(title) ? '180px' : '50px', minWidth: isLongCell(title) ? '180px' : '50px' }}
      >
        {titleComponent}
        <br />
        {subTitleComponent}
        <br />
        {statusIcon}
        {logsIcon}
        {renderStatusSpec}
        {metricsIcon}
      </TableCell>
    </Tooltip>
  );
});

const combineText = (title: string, tooltip?: string) => {
  if (!tooltip) return title;
  return (
    <span>
      {tooltip}
      <br />
      <br />
      {title}
    </span>
  );
};

const newlineCommas = (input: string) => {
  const arr = input.split(', ');
  if (arr.length === 1) return input;
  return arr.map((text, i) => (
    <span key={i} style={{ fontSize: '0.8rem' }}>
      {text}
      {i !== arr.length - 1 ? <br /> : false}
    </span>
  ));
};

// should the cell be short or long
const isLongCell = (title: string) => {
  const lc = title.toLowerCase();
  if (lc === 'ok') return false;
  if (lc === 'started') return false;
  return true;
};
