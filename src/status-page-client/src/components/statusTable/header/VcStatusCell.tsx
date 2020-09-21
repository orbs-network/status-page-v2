import React, { useMemo } from 'react';
import { TableCell, Tooltip, Typography } from '@material-ui/core';
import { VirtualChain } from '../../../../../model/model';
import moment from 'moment';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import { green, orange, red } from '@material-ui/core/colors';

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
      bgColor = red['500'];
      tooltipText = 'VC has expired';
    } else if (isExpiringInLessThanAMonth) {
      bgColor = orange['400'];
      tooltipText = 'VC expires in less than 30 days';
    } else {
      bgColor = green['400'];
    }

    return {
      bgColor,
      tooltipText,
    };
  }, [vc.ExpirationTimeSeconds]);

  return (
    <Tooltip title={tooltipText}>
      <TableCell style={{ textAlign: 'center', backgroundColor: bgColor }}>
        <Typography>{moment.unix(vc.ExpirationTimeSeconds).format('YYYY-MM-DD')}</Typography>
        {vc.IsCertified ? (
          <Tooltip title={'Certified validators only'} arrow>
            <VerifiedUserIcon />
          </Tooltip>
        ) : null}
        {vc.IsCanary ? (
          <Tooltip title={'Canary'} arrow>
            <NewReleasesIcon />
          </Tooltip>
        ) : null}
      </TableCell>
    </Tooltip>
  );
});
