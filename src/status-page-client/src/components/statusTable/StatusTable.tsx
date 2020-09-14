import React, { useMemo, useState } from 'react';
import MaterialTable, { Column } from 'material-table';
import { TABLE_ICONS } from '../tables/TableIcons';
import { Button, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { VirtualChain, Guardian, Service } from '../../../../model/model';
import { VcStatusCell } from './VcStatusCell';
import { StatusTableHeader } from './StatusTableHeader';

export interface ValidatorStatusGist {
  name: string;
  ip: string;
}

export interface VcGist {
  id: string;
  name: string;
}

interface IProps {
  vcs: VirtualChain[];
  committeeValidators: Guardian[];
  standByValidators: Guardian[];
  services: Service[];
}

export const StatusTable = React.memo<IProps>((props) => {
  const { vcs, committeeValidators, standByValidators, services } = props;
  console.log(vcs);
  console.log(committeeValidators);

  const [showServices, setShowServices] = useState(false);

  console.log({ showServices });

  return (
    <TableContainer component={Paper}>
      <Table>
        <StatusTableHeader services={services} vcs={vcs} setShowServices={setShowServices} showServices={showServices} />
      </Table>
    </TableContainer>
  );
});
