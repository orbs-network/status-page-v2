import React, { useMemo } from 'react';
import { TableCell, Tooltip } from '@material-ui/core';
import { NodeService } from '../../../../../model/model';
import { HealthLevel } from '../../../shared/HealthLevel';
import { backgroundColorFromHealthLevel } from '../../statusUtils';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

interface IProps {
  serviceNames: string[];
  nodeServices: NodeService[];
}

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  cell: {
    textAlign: 'center', 
    border: '2px solid #06142e', 
    borderRight: 'none',
    minWidth: '140px'
  }
}));

export const ServicesGistCell = React.memo<IProps>((props) => {
  const classes = useStyles();
  const { nodeServices, serviceNames } = props;
  const aggregatedStatus = useMemo(() => {
    const allHealthStatues = nodeServices.map((nodeService) => nodeService.Status);

    if (allHealthStatues.includes(HealthLevel.Red)) {
      return HealthLevel.Red;
    } else if (allHealthStatues.includes(HealthLevel.Yellow)) {
      return HealthLevel.Yellow;
    } else if (allHealthStatues.includes(HealthLevel.Green)) {
      return HealthLevel.Green;
    } else return HealthLevel.Gray;
  }, [nodeServices]);

  const backgroundColor = backgroundColorFromHealthLevel(aggregatedStatus);

  const servicesIcons = useMemo(() => {
    return nodeServices.map((nodeService, index) => {
      const serviceStatusOK = nodeService.Status === HealthLevel.Green;
      const serviceStatusUnknown = nodeService.Status === HealthLevel.Gray;
      const serviceName = serviceNames[index]; // TODO : O.L : Merge data objects

      const icon = serviceStatusUnknown ? <SearchIcon /> : (serviceStatusOK ? <CheckIcon /> : <CloseIcon />);
      // const title = serviceStatusOK ? serviceName : `${serviceName} : ${nodeService.StatusMsg || nodeService.Status}`;

      return (
        <Tooltip title={createTooltip(serviceName, nodeService.StatusMsg , nodeService.StatusToolTip)} key={serviceName} arrow>
          <a className={classes.link} href={nodeService.URLs.Status} target={'_blank'} rel={'noopener noreferrer'}>
            {icon}
          </a>
        </Tooltip>
      );
    });
  }, [classes.link, nodeServices, serviceNames]);

  // DEV_NOTE : O.L : This 'borderRight:none' is a hack to prevent overflowX on large screens
  // TODO : O.L : Find a better solution
  return <TableCell className={classes.cell} style={{backgroundColor}}>{servicesIcons}</TableCell>;
});

const createTooltip = (servicesName: string, status: string, error?: string) => {
  return (
    <span>{servicesName}:<br/>
      {error ? <span>{error}<br/></span> : false}
      {status}
    </span>
  );
}
