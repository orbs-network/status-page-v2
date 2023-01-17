import React from 'react';
import {EthereumStatus} from "../../../../model/model";
import {createStyles, Theme, Tooltip} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';

import {backgroundColorFromHealthLevel} from "../statusUtils";
import {HealthLevel} from "../../shared/HealthLevel";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            ...theme.typography.h6,
            fontSize: '1rem !important'
        },
        icon: {
            margin: 5
        }
    }),
);

interface IProps {
  ethereumStatus: EthereumStatus | undefined
}

export const POSContractsStatus = React.memo<IProps>((props) => {
  const { ethereumStatus } = props;

  const statusTooltip = ethereumStatus?.Status == null ? ""
      : <>{ethereumStatus?.StatusToolTip.split("\n").map((line, i) => <div key={i}>{line}</div>)}</>

  const classes = useStyles();
  return (
    <>
    {(ethereumStatus === null || ethereumStatus === undefined) ?
      null
      : (
        <Tooltip title={statusTooltip} arrow>
        <div className={classes.root} style={{margin: '1px', padding: "10px", backgroundColor: backgroundColorFromHealthLevel(ethereumStatus.Status, true), display: 'flex', alignItems: 'center'}}>
            {ethereumStatus.Status == HealthLevel.Green && <>
            <CheckCircleIcon className={classes.icon}/>
            </>}
            {(ethereumStatus.Status == HealthLevel.Red || ethereumStatus.Status == HealthLevel.Yellow) && <>
            <WarningIcon className={classes.icon}/>
            </>}
            <span style={{whiteSpace: "break-spaces"}}>{ethereumStatus.StatusMsg}</span>
        </div>
    </Tooltip>
    )}
    </>
  );
});

