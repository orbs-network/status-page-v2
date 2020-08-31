import React, { useMemo } from 'react';
import MaterialTable, { Column } from 'material-table';
import { TABLE_ICONS } from '../tables/TableIcons';
import { Button, Paper, Table, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { VirtualChain, Guardian, Service } from '../../../../model/model';
import { VcStatusCell } from './VcStatusCell';

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

  const vcsRow = useMemo(() => {
    const servicesCells = services.map((service) => <TableCell></TableCell>);

    const topRow = (
      <TableRow>
        <TableCell></TableCell>
        <TableCell>
          <Button>Show</Button>
        </TableCell>
        {vcs.map((vc) => (
          <VcStatusCell key={vc.Id} vc={vc} />
        ))}
      </TableRow>
    );

    return topRow;
  }, [vcs]);

  // return <MaterialTable icons={TABLE_ICONS} columns={columns} data={validatorStatusGists}/>
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Validators</TableCell>
            <TableCell>Node services</TableCell>
            {vcs.map((vc) => (
              <TableCell key={vc.Id}>
                {vc.Id} - {vc.Name}
              </TableCell>
            ))}
          </TableRow>
          {vcsRow}
        </TableHead>
      </Table>
    </TableContainer>
  );
});
