import React from 'react';
import { Paper, Table, TableContainer, TableRow, TableCell } from '@material-ui/core';
import {RootNodeStatus, EthereumStatus} from "../../../../model/model";
import {createStyles, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import { POSContractsStatus } from "./POSContractsStatus";
import { RootNodeStatusCell } from "./RootNodeStatusCell";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        headerCell: {
            textAlign: 'center',
            color: 'white',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        }
    }),
);

interface IProps {
    ethereumStatus: EthereumStatus | undefined
    rootStatus: RootNodeStatus | undefined
}

export const StatusRow = React.memo<IProps>((props) => {
  const { rootStatus, ethereumStatus } = props;

  const classes = useStyles();
  return (
      <div className={classes.headerCell}>
        <RootNodeStatusCell rootStatus={rootStatus} />
        <POSContractsStatus ethereumStatus={ethereumStatus} />
     </div>
 );
});

