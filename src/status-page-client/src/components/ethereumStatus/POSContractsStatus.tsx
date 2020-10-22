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

  const statusTooltip = ethereumStatus?.Status == null ? "Status is unknown"
      : ethereumStatus?.Status == HealthLevel.Green ? "No issues detected"
      : <>{ethereumStatus?.StatusToolTip.split("\n").map((line, i) => <div key={i}>{line}</div>)}</>

  const classes = useStyles();
  return (
      <div style={{textAlign: 'center', margin: "10px 0", color: "white"}}>
          <div style={{maxWidth: '500px', display: 'inline-block' }}>
              <Tooltip title={statusTooltip} arrow>
                    <div className={classes.root} style={{margin: "10px", padding: "10px", backgroundColor: backgroundColorFromHealthLevel(ethereumStatus?.Status || HealthLevel.Yellow), display: 'flex', alignItems: 'center'}}>
                        {ethereumStatus?.Status == HealthLevel.Green && <>
                            <CheckCircleIcon className={classes.icon}/>
                            <span>PoS contracts status: OK</span>
                        </>}
                        {(ethereumStatus?.Status == HealthLevel.Red || ethereumStatus?.Status == HealthLevel.Yellow) && <>
                            <WarningIcon className={classes.icon}/>
                            <span>POS CONTRACTS ISSUES DETECTED</span>
                        </>}
                        {ethereumStatus?.Status == null && <>
                            <WarningIcon className={classes.icon}/>
                            <span>PoS contracts status: UNKNOWN</span>
                        </>}
                    </div>
              </Tooltip>
          </div>
      </div>
  );
});

