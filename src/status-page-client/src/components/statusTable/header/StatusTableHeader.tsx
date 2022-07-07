import React, { useMemo } from 'react';
import { Button, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { VcStatusCell } from './VcStatusCell';
import { VirtualChain, Service } from '../../../../../model/model';
import { makeStyles } from '@material-ui/core/styles';
import { isDebug, servicesDisplayNameDict, showVmServices } from '../../../consts';

interface IProps {
  vcs: VirtualChain[];
  services: Service[];
  vmServices: Service[];
  expandedServices: Service[];
  showServices: boolean;
  setShowServices: (val: boolean) => void;


}

const useStyles = makeStyles((theme) => ({
  headerRow: {
    borderBottom: '2px solid #cccccc20',
  },
 
  headerCell: {
    width: '10rem',
    textAlign: 'center',
    fontSize: '1.2rem',
    paddingTop:10
  },

  link: {
    textDecoration: 'none',
    color: 'inherit',
    borderBottom: '1px dotted #ddd',
  },
}));



export const StatusTableHeader = React.memo<IProps>((props) => {
  const { showServices, vcs, services, setShowServices, vmServices, expandedServices } = props;

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
      <TableRow className={classes.headerRow}>
        <TableCell className={classes.headerCell} />
        <TableCell className={classes.headerCell}>
          <Button variant="outlined" onClick={onClick}>
            {showServices ? 'Hide Services' : 'Expand Services'}
          </Button>
        </TableCell>
        {servicesHeaderCells}

        {expandedServices.map((s) => {
          return (
            <TableCell key={s.Name} className={classes.headerCell}>
              <Typography>{servicesDisplayNameDict[s.Name]}</Typography>
            </TableCell>
          );
        })}
        
        {showVmServices() &&  vmServices.map((s, index) => {
          return (
            <TableCell key={s.Name} className={classes.headerCell}>
              <Typography> {s.Name}</Typography>
            </TableCell>
          );
        })}
        {isDebug() && vcs.map((vc) => <VcStatusCell key={vc.Id} vc={vc} />)}
      </TableRow>
    );

    return topRow;
  }, [classes.headerCell, servicesHeaderCells, setShowServices, showServices, vcs, classes.headerRow, expandedServices, vmServices]);

  // DEV_NOTE : O.L : Setting the TableCell width to a small number is a trick to force "fit-content"
  // TODO : O.L : Find a better method for 'fit-content'
  return (
    <TableHead>
      <TableRow className={classes.headerRow}>
        <TableCell className={classes.headerCell} style={{ paddingBottom: '20px' }}>
          Validators
        </TableCell>
        <TableCell className={classes.headerCell} style={{ paddingBottom: '20px' }}>
          Node services
        </TableCell>
        {headerServicesPlaceholders}
      </TableRow>

      <TableRow className={classes.headerRow}>
        {isDebug() &&
          vcs.map((vc) => (
            <TableCell className={classes.headerCell} style={{ paddingBottom: '20px' }} key={vc.Id}>
              {vc.IsCanary ? (
                vc.Id
              ) : (
                <a href={vc.VirtualChainUrls.Prism} target={'_blank'} rel={'noopener noreferrer'} className={classes.link}>
                  {vc.Id}
                </a>
              )}
              {vc.Name ? ` - ${vc.Name}` : false}
            </TableCell>
          ))}
      </TableRow>
      {topRow}
    </TableHead>
  );
});
