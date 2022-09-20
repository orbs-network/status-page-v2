import React from 'react';
import {TableCell, Tooltip, Typography} from '@material-ui/core';
import { Guardian } from '../../../../../model/model';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { green, red, grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { CommonLink } from '../../link/CommonLink';
import polygonIcon from "../../../media/polygon.svg"
import ethIcon from "../../../media/ethereum.svg"

interface IProps {
  validator: Guardian;
  isInCommitteeEth: boolean;
  isInCommitteeMatic: boolean;
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
    customImage: {
        margin: "3px 2px 0px 0px",
        width: "15px",
        height: "15px"
    }
}));

export const ValidatorInfoCell = React.memo<IProps>((props) => {
  const { validator, isInCommitteeEth, isInCommitteeMatic, isShowAllRegistered } = props;
  const classes = useStyles();

  const certifiedColor = validator.IsCertified ? green[400] : red[400];
  const certifiedText = validator.IsCertified ? 'Certified' : 'Not Certified';
  let committeeIcon;
  let committeeText = '';
  if (isInCommitteeEth && isInCommitteeMatic) {
      committeeIcon = <SupervisedUserCircleIcon style={{ color: green[400] }}/>;
      committeeText = 'In Eth and Polygon Committees';
  }
  else if (isInCommitteeEth) {
      committeeIcon = <img src={ethIcon} className={classes.customImage}/>
      committeeText = 'In Eth Committee';
  }
  else if (isInCommitteeMatic) {
      committeeIcon = <img src={polygonIcon} className={classes.customImage}/>
      committeeText = 'In Polygon Committee';
  }
  else {
      committeeIcon = <SupervisedUserCircleIcon style={{ color: red[400] }}/>;
      committeeText = 'Not in Committee'
  }
  committeeText = isShowAllRegistered ? 'Registered Guardian' : committeeText;
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
      <div style={{display: "flex", alignItems: "center"}}>
          <Tooltip title={certifiedText} arrow>
            <VerifiedUserIcon style={{ color: certifiedColor }} />
          </Tooltip>
          <Tooltip title={concatStake(committeeText, validator)} arrow>
            <div style={{display: "flex", alignItems: "center"}}>{committeeIcon}</div>
          </Tooltip>
      </div>
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
