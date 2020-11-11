import React from 'react';
import {RootNodeStatus} from "../../../../model/model";
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
  rootStatus: RootNodeStatus | undefined
}

export const RootNodeStatusCell = React.memo<IProps>((props) => {
  const { rootStatus } = props;
  const statusTooltip = rootStatus?.Status == null ? ""
      : <>{rootStatus?.StatusToolTip.split("\n").map((line, i) => <div key={i}>{line}</div>)}</>

  const classes = useStyles();
  return (
      <>
            {(rootStatus === null || rootStatus === undefined) ? 
              null
              : (
                <Tooltip title={rootStatus.StatusToolTip} arrow>
                <div className={classes.root} style={{margin: '1px', padding: "10px", backgroundColor: backgroundColorFromHealthLevel(rootStatus.Status), display: 'flex', alignItems: 'center'}}>
                    {rootStatus.Status == HealthLevel.Green && <>
                    <CheckCircleIcon className={classes.icon}/>
                    </>}
                    {(rootStatus.Status == HealthLevel.Red || rootStatus.Status == HealthLevel.Yellow) && <>
                    <WarningIcon className={classes.icon}/>
                    </>}
                    <span>{rootStatus.StatusMsg}</span>
                </div>
            </Tooltip>
            )}
      </>
  );
});

