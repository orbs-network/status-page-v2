import React, { useMemo } from 'react';
import { Button, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { VcStatusCell } from './VcStatusCell';
import { VirtualChain, Service } from '../../../../../model/model';
import { makeStyles } from '@material-ui/core/styles';

interface IProps {
  vcs: VirtualChain[];
  services: Service[];
  showServices: boolean;
  setShowServices: (val: boolean) => void;
}

const useStyles = makeStyles((theme) => ({
  headerCell: {
    width: '10rem',
    textAlign: 'center',
    borderBottom: '2px solid #cccccc20'
  },
}));

export const StatusTableHeader = React.memo<IProps>((props) => {
  const { showServices, vcs, services, setShowServices } = props;
  const classes = useStyles();

  const servicesHeaderCells = useMemo(() => {
    if (!showServices) {
      return null;
    } else {
      return services.map((service) => (
        <TableCell className={classes.headerCell} key={service.Name}>
          <Typography>{service.Name}</Typography>
        </TableCell>
      ));
    }
  }, [classes.headerCell, services, showServices]);

  const headerServicesPlaceholders = useMemo(() => {
    if (!showServices) {
      return null;
    } else {
      return services.map((service) => <TableCell className={classes.headerCell} key={service.Name} />);
    }
  }, [classes.headerCell, services, showServices]);

  // Build the top row (services and vcs)
  const topRow = useMemo(() => {
    const onClick = showServices ? () => setShowServices(false) : () => setShowServices(true);

    const topRow = (
      <TableRow>
        <TableCell className={classes.headerCell} />
        <TableCell className={classes.headerCell}>
          <Button variant="outlined" onClick={onClick}>{showServices ? 'Hide Services' : 'Expand Services'}</Button>
        </TableCell>
        {servicesHeaderCells}
        {vcs.map((vc) => (
          <VcStatusCell key={vc.Id} vc={vc} />
        ))}
      </TableRow>
    );

    return topRow;
  }, [classes.headerCell, servicesHeaderCells, setShowServices, showServices, vcs]);

  // DEV_NOTE : O.L : Setting the TableCell width to a small number is a trick to force "fit-content"
  // TODO : O.L : Find a better method for 'fit-content'
  return (
    <TableHead>
      <TableRow>
        <TableCell className={classes.headerCell}>Validators</TableCell>
        <TableCell className={classes.headerCell}>Node services</TableCell>
        {headerServicesPlaceholders}
        {vcs.map((vc) => (
          <TableCell className={classes.headerCell} key={vc.Id}>
            {vc.Id} - {vc.Name}
          </TableCell>
        ))}
      </TableRow>
      {topRow}
    </TableHead>
  );
});
