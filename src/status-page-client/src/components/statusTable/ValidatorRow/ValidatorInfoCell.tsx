import React from 'react';
import { TableCell, Tooltip, Typography } from '@material-ui/core';
import { Guardian } from '../../../../../model/model';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { green, red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { CommonLink } from '../../link/CommonLink';

interface IProps {
  validator: Guardian;
  isInCommittee: boolean;
}

const useStyles = makeStyles((theme) => ({}));

export const ValidatorInfoCell = React.memo<IProps>((props) => {
  const { validator, isInCommittee } = props;
  const classes = useStyles();

  const certifiedColor = validator.IsCertified ? green[400] : red[400];
  const certifiedText = validator.IsCertified ? 'Certified' : 'Not Certified';
  const committeeColor = isInCommittee ? green[400] : red[400];
  const committeeText = isInCommittee ? 'In Committee' : 'Not in Committee';
  // TODO : O.L : Add reputation after it is implemented in the vc.
  const reputation = null;

  return (
    <TableCell style={{ textAlign: 'center', borderBottom: '2px solid #cccccc20' }}>
      <CommonLink href={validator.Website}>
        <Typography style={{ fontWeight: 'bold' }}>{validator.Name}</Typography>
      </CommonLink>
      <Typography>{validator.Ip}</Typography>
      <Tooltip title={certifiedText} arrow>
        <VerifiedUserIcon style={{ color: certifiedColor }} />
      </Tooltip>
      <Tooltip title={committeeText} arrow>
        <SupervisedUserCircleIcon style={{ color: committeeColor }} />
      </Tooltip>
    </TableCell>
  );
});
