import React, { useMemo } from 'react';
import { TableCell, Tooltip } from '@material-ui/core';
import { NodeService } from '../../../../../model/model';
import { HealthLevel } from '../../../shared/HealthLevel';
import { backgroundColorFromHealthLevel } from './statusTableUtils';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
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
    } else {
      return HealthLevel.Green;
    }
  }, [nodeServices]);

  const backgroundColor = backgroundColorFromHealthLevel(aggregatedStatus);

  const servicesIcons = useMemo(() => {
    return nodeServices.map((nodeService, index) => {
      const serviceStatusOK = nodeService.Status === HealthLevel.Green;
      const servicesName = serviceNames[index]; // TODO : O.L : Merge data objects

      const icon = serviceStatusOK ? <CheckIcon /> : <CloseIcon />;
      const title = serviceStatusOK ? servicesName : `${servicesName} : ${nodeService.StatusMsg || nodeService.Status}`;

      return (
        <Tooltip title={title} key={servicesName}>
          <a className={classes.link} href={nodeService.URLs.Status} target={'_blank'} rel={'noopener noreferrer'}>
            {icon}
          </a>
        </Tooltip>
      );
    });
  }, [classes.link, nodeServices, serviceNames]);

  return <TableCell style={{ backgroundColor }}>{servicesIcons}</TableCell>;
});