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

  const { bgColor, tooltipText } = useMemo<{ bgColor: string; tooltipText: string }>(() => {
    let bgColor = '';
    let tooltipText = '';

    const nowUtc = new Date().getTime();
    const nowUtcInSeconds = nowUtc / 1000;
    // TODO : O.L : Improve this calculation to use a real month (e.g 29 - 29, 31-31)
    const monthFromNow = nowUtcInSeconds + 60 * 60 * 30;

    const hasExpired = vc.ExpirationTimeSeconds < nowUtcInSeconds;
    const isExpiringInLessThanAMonth = vc.ExpirationTimeSeconds < monthFromNow;

    if (hasExpired) {
      bgColor = backgroundColorFromHealthLevel(HealthLevel.Red);
      tooltipText = 'VC has expired';
    } else if (isExpiringInLessThanAMonth) {
      bgColor = backgroundColorFromHealthLevel(HealthLevel.Yellow);
      tooltipText = 'VC expires in less than 30 days';
    } else {
      bgColor = backgroundColorFromHealthLevel(HealthLevel.Green);
    }

    return {
      bgColor,
      tooltipText,
    };
  }, [vc.ExpirationTimeSeconds]);

  return (
    <Tooltip title={tooltipText} arrow>
      <TableCell style={{ textAlign: 'center', backgroundColor: bgColor }}>
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
