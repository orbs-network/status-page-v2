import React, { useMemo } from 'react';
import { TableCell, Tooltip, Typography } from '@material-ui/core';
import { HealthLevel } from '../../../shared/HealthLevel';
import { makeStyles } from '@material-ui/core/styles';

interface IProps {
  title: string;
  subTitle: string;
  healthLevel: HealthLevel;
  titleLink?: string;
  subTitleLink?: string;
  tooltip?: string;
}

const useStyles = makeStyles((theme) => ({
  cell: {
    border: '1px solid black',
    width: 'fit-content',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

export const StatusCell = React.memo<IProps>((props) => {
  const classes = useStyles();
  const { healthLevel, title, subTitle, tooltip, titleLink, subTitleLink } = props;
  const backgroundColor = backgroundColorFromHealthLevel(healthLevel);
  const truncatedTitle = useMemo(() => {
    return truncate(title);
  }, [title]);

  const titleComponent = useMemo(() => {
    let baseComponent = <Typography variant={'caption'}>{truncatedTitle}</Typography>;
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
  }, [classes.link, titleLink, truncatedTitle]);

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

  return (
    <Tooltip title={tooltip || title}>
      <TableCell className={classes.cell} style={{ backgroundColor }}>
        {titleComponent}
        <br />
        {subTitleComponent}
      </TableCell>
    </Tooltip>
  );
});

const TITLE_LENGTH = 10;
const truncate = (input: string) => (input.length > TITLE_LENGTH ? `${input.substring(0, TITLE_LENGTH)}...` : input);

function backgroundColorFromHealthLevel(healthLevel: HealthLevel) {
  switch (healthLevel) {
    case HealthLevel.Green: {
      return 'green';
    }
    case HealthLevel.Yellow: {
      return 'yellow';
    }
    case HealthLevel.Red: {
      return 'red';
    }
    default: {
      throw new Error(`Unsupported health level of ${healthLevel}`);
    }
  }
}