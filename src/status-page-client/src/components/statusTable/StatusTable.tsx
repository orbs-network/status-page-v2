import React, { useMemo, useState } from 'react';
import MaterialTable, { Column } from 'material-table';
import { TABLE_ICONS } from '../tables/TableIcons';
import { Button, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
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

  const [showServices, setShowServices] = useState(false);

  console.log({ showServices });

  const servicesHeaderCells = useMemo(() => {
    if (!showServices) {
      return null;
    } else {
      return services.map((service) => (
        <TableCell>
          <Typography>{service.Name}</Typography>
        </TableCell>
      ));
    }
  }, [services, showServices]);

  const headerServicesPlaceholders = useMemo(() => {
    if (!showServices) {
      return null;
    } else {
      return services.map((service) => <TableCell />);
    }
  }, [services, showServices]);

  // Build the top row (services and vcs)
  const topRow = useMemo(() => {
    const servicesCells = services.map((service) => <TableCell></TableCell>);

    const onClick = showServices ? () => setShowServices(false) : () => setShowServices(true);

    const topRow = (
      <TableRow>
        <TableCell></TableCell>
        <TableCell>
          <Button onClick={onClick}>{showServices ? 'Hide' : 'Show'}</Button>
        </TableCell>
        {servicesHeaderCells}
        {vcs.map((vc) => (
          <VcStatusCell key={vc.Id} vc={vc} />
        ))}
      </TableRow>
    );

    return topRow;
  }, [services, servicesHeaderCells, vcs]);

  // return <MaterialTable icons={TABLE_ICONS} columns={columns} data={validatorStatusGists}/>
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Validators</TableCell>
            <TableCell>Node services</TableCell>
            {headerServicesPlaceholders}
            {vcs.map((vc) => (
              <TableCell key={vc.Id}>
                {vc.Id} - {vc.Name}
              </TableCell>
            ))}
          </TableRow>
          {topRow}
        </TableHead>
      </Table>
    </TableContainer>
  );
});
