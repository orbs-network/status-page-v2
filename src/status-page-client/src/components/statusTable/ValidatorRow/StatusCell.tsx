import React, { useMemo } from 'react';
import { TableCell, Typography } from '@material-ui/core';
import { HealthLevel } from '../../../shared/HealthLevel';

interface IProps {
  title: string;
  subTitle: string;
  healthLevel: HealthLevel;
}

export const StatusCell = React.memo<IProps>((props) => {
  const { healthLevel, title, subTitle } = props;
  const backgroundColor = backgroundColorFromHealthLevel(healthLevel);
  const truncatedTitle = useMemo(() => {
    return truncate(title);
  }, [title]);

  return (
    <TableCell style={{ backgroundColor }}>
      <Typography>{truncatedTitle}</Typography>
      <Typography>{subTitle}</Typography>
    </TableCell>
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
