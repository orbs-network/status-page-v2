import React from 'react';
import { TableCell } from '@material-ui/core';
import { Guardian } from '../../../../../model/model';

interface IProps {
  validator: Guardian;
}

export const ValidatorInfoCell = React.memo<IProps>((props) => {
  const { validator } = props;

  return <TableCell style={{ textAlign: 'center' }}>{validator.Name}</TableCell>;
});
