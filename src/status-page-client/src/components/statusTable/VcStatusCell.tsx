import React from 'react';
import { TableCell } from '@material-ui/core';
import { VirtualChain } from '../../../../model/model';
import moment from 'moment';

interface IProps {
  vc: VirtualChain;
}

export const VcStatusCell = React.memo<IProps>((props) => {
  const { vc } = props;
  return (
    <TableCell>
      {moment.unix(vc.ExpirationTimeSeconds).format('YYYY-MM-DD')} {vc.IsCanary ? 'Canary' : 'Main'} {vc.IsCertified ? 'Certified' : 'Open'}
    </TableCell>
  );
});
