import React from 'react';
import { Paper, Table, TableContainer, TableRow, TableCell } from '@material-ui/core';
import {GenStatus, EthereumStatus} from "../../../../model/model";
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
            justifyContent: 'center',
            marginBottom: '20px'
        }
    }),
);

interface IProps {
    maticStatus: EthereumStatus | undefined
    ethereumStatus: EthereumStatus | undefined
    rootStatus: GenStatus | undefined
}

export const StatusRow = React.memo<IProps>((props) => {
  const { rootStatus, ethereumStatus, maticStatus } = props;

  const classes = useStyles();
  return (
      <div className={classes.headerCell}>
        <RootNodeStatusCell rootStatus={rootStatus} />
        <POSContractsStatus ethereumStatus={ethereumStatus} />
        <POSContractsStatus ethereumStatus={maticStatus}/>
     </div>
 );
});

