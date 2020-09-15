import React, { useMemo } from 'react';
import { Button, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { VcStatusCell } from './VcStatusCell';
import { VirtualChain, Service } from '../../../../model/model';

interface IProps {
  vcs: VirtualChain[];
  services: Service[];
  showServices: boolean;
  setShowServices: (val: boolean) => void;
}

export const StatusTableHeader = React.memo<IProps>((props) => {
  const { showServices, vcs, services, setShowServices } = props;

  const servicesHeaderCells = useMemo(() => {
    if (!showServices) {
      return null;
    } else {
      return services.map((service) => (
        <TableCell key={service.Name}>
          <Typography>{service.Name}</Typography>
        </TableCell>
      ));
    }
  }, [services, showServices]);

  const headerServicesPlaceholders = useMemo(() => {
    if (!showServices) {
      return null;
    } else {
      return services.map((service) => <TableCell key={service.Name} />);
    }
  }, [services, showServices]);

  // Build the top row (services and vcs)
  const topRow = useMemo(() => {
    const onClick = showServices ? () => setShowServices(false) : () => setShowServices(true);

    const topRow = (
      <TableRow>
        <TableCell />
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
  }, [services, servicesHeaderCells, setShowServices, showServices, vcs]);

  return (
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
  );
});
