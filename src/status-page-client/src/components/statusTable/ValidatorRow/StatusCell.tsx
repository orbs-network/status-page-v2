import React from 'react';
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
  return (
    <TableCell style={{ backgroundColor }}>
      <Typography>{title}</Typography>
      <Typography>{subTitle}</Typography>
    </TableCell>
  );
});

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
