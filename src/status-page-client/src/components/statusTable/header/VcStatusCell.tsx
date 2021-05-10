import React, { useMemo } from 'react';
import { TableCell, Tooltip, Typography } from '@material-ui/core';
import { VirtualChain } from '../../../../../model/model';
import moment from 'moment';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import { backgroundColorFromHealthLevel } from '../../statusUtils';
import { HealthLevel } from '../../../shared/HealthLevel';

interface IProps {
  vc: VirtualChain;
}

export const VcStatusCell = React.memo<IProps>((props) => {
  const { vc } = props;

  return (
    <Tooltip title={vc.SubscriptionStatusToolTip} arrow>
      <TableCell style={{ textAlign: 'center', backgroundColor: backgroundColorFromHealthLevel(vc.SubscriptionStatus) }}>
        <Typography>{moment.unix(vc.ExpirationTimeSeconds).format('YYYY-MM-DD')}</Typography>
        {vc.IsCertified ? (
          <Tooltip title={'Certified validators only'} arrow>
            <VerifiedUserIcon />
          </Tooltip>
        ) : null}
        {vc.IsCanary ? (
          <Tooltip title={'Canary'} arrow>
            <OfflineBoltIcon htmlColor='#ffd95c' />
          </Tooltip>
        ) : null}
      </TableCell>
    </Tooltip>
  );
});
