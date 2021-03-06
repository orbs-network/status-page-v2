import React from 'react';
import { TableCell, Tooltip, Typography } from '@material-ui/core';
import { Guardian } from '../../../../../model/model';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { green, red, grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { CommonLink } from '../../link/CommonLink';

interface IProps {
  validator: Guardian;
  isInCommittee: boolean;
  isShowAllRegistered: boolean;
}

const useStyles = makeStyles((theme) => ({
  cell: {
    textAlign: 'left',
    borderBottom: '2px solid #cccccc20',
    minWidth: '260px',
  },
  noMaxWidth: {
    maxWidth: 'none',
  },
}));

export const ValidatorInfoCell = React.memo<IProps>((props) => {
  const { validator, isInCommittee, isShowAllRegistered } = props;
  const classes = useStyles();

  const certifiedColor = validator.IsCertified ? green[400] : red[400];
  const certifiedText = validator.IsCertified ? 'Certified' : 'Not Certified';
  const committeeColor = isShowAllRegistered ? grey[400] : (isInCommittee ? green[400] : red[400]);
  const committeeText = isShowAllRegistered ? 'Registered Guardian' : (isInCommittee ? 'In Committee' : 'Not in Committee');
  // TODO : O.L : Add reputation after it is implemented in the vc.
  // const reputation = null;

  return (
    <TableCell className={classes.cell}>
      <CommonLink href={validator.Website}>
        <Typography style={{ fontWeight: 'bold' }}>{validator.Name}</Typography>
      </CommonLink>
      <Typography>
        <Tooltip
          arrow
          interactive
          placement="right"
          classes={{ tooltip: classes.noMaxWidth }}
          title={
            <span>
              Guardian: <code>0x{validator.EthAddress}</code>
              <br />
              Node: <code>0x{validator.OrbsAddress}</code>
            </span>
          }
        >
          <span>{validator.Ip}</span>
        </Tooltip>
      </Typography>
      <Tooltip title={certifiedText} arrow>
        <VerifiedUserIcon style={{ color: certifiedColor }} />
      </Tooltip>
      <Tooltip title={concatStake(committeeText, validator)} arrow>
        <SupervisedUserCircleIcon style={{ color: committeeColor }} />
      </Tooltip>
    </TableCell>
  );
});

const concatStake = (text: string, validator: Guardian) => {
  return (
    <span>
      {text}
      <br />
      {validator.EffectiveStake.toLocaleString()} ORBS
    </span>
  );
};
