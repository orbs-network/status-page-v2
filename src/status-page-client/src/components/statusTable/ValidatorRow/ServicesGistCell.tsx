import React, { useMemo } from 'react';
import { TableCell, Tooltip } from '@material-ui/core';
import { NodeService } from '../../../../../model/model';
import { HealthLevel } from '../../../shared/HealthLevel';
import { backgroundColorFromHealthLevel } from '../../statusUtils';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import {HourglassFullRounded, HourglassFullTwoTone} from "@material-ui/icons";
import { differenceInSeconds, format } from 'date-fns';
import { action } from 'mobx';

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
    } else if (allHealthStatues.includes(HealthLevel.Blue)) {
      return HealthLevel.Blue;
    } else if (allHealthStatues.includes(HealthLevel.Yellow)) {
      return HealthLevel.Yellow;
    } else if (allHealthStatues.includes(HealthLevel.Green)) {
      return HealthLevel.Green;
    } else return HealthLevel.Gray;
  }, [nodeServices]);

  const backgroundColor = backgroundColorFromHealthLevel(aggregatedStatus, true);

  let timeLeft : string = "";

  const servicesIcons = useMemo(() => {
    return nodeServices.map((nodeService, index) => {
      const serviceStatusOK = nodeService.Status === HealthLevel.Green;
      const serviceStatusUnknown = nodeService.Status === HealthLevel.Gray;
      const serviceName = serviceNames[index]; // TODO : O.L : Merge data objects
      let tooltipText = nodeService.StatusToolTip;

      let icon = <CheckIcon />;

      if (nodeService.Status === HealthLevel.Blue) {
        icon = <HourglassFullRounded />;
      } else if (nodeService.Status === HealthLevel.Red) {
          icon = <CloseIcon />;
      } else if (nodeService.Status === HealthLevel.Gray) {
          icon = <SearchIcon />;
      } else if (nodeService.Status === HealthLevel.Yellow) {
          icon = <CloseIcon />;
      }
      // const icon = serviceStatusUnknown ? <SearchIcon /> : (serviceStatusOK ? <HourglassFullTwoTone /> : <CloseIcon />);
      // const title = serviceStatusOK ? serviceName : `${serviceName} : ${nodeService.StatusMsg || nodeService.Status}`;

      const renderTimeLeft = () => {
        const epoch = parseInt(nodeService.StatusToolTip);
        const futureDate = new Date(epoch * 1000); // Convert from epoch seconds to milliseconds
        const currentDate = new Date();

        // Calculate the difference in seconds
        const diffInSeconds = differenceInSeconds(futureDate, currentDate);

        // If the time has already passed, don't display anything
        if (diffInSeconds <= 0) return "";

        // Format the time in HH:mm:ss
        const hours = Math.floor(diffInSeconds / 3600);
        const minutes = Math.floor((diffInSeconds % 3600) / 60);
        const seconds = diffInSeconds % 60;

        // Ensure two-digit formatting for hours, minutes, and seconds
        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        return formattedTime;
      };

      if (serviceName === "Controller" && nodeService.Status === HealthLevel.Blue ) {
        if (renderTimeLeft()=="") {
          timeLeft = "Updating now";
        } else {
          timeLeft = "Updating in: " + renderTimeLeft();
        }

        tooltipText = timeLeft;
      }

      return (
        <Tooltip title={createTooltip(serviceName, nodeService.StatusMsg , tooltipText)} key={serviceName} arrow>
          <a className={classes.link} href={nodeService.URLs.Status} target={'_blank'} rel={'noopener noreferrer'}>
            {icon}
          </a>
        </Tooltip>
      );
    });
  }, [classes.link, nodeServices, serviceNames]);

  // DEV_NOTE : O.L : This 'borderRight:none' is a hack to prevent overflowX on large screens
  // TODO : O.L : Find a better solution
  return <TableCell className={classes.cell} style={{ backgroundColor }}>
    <div><b>{timeLeft}</b></div>
    <div>{servicesIcons}</div>
  </TableCell>
});

const createTooltip = (servicesName: string, status: string, error?: string) => {
  return (
    <span>{servicesName}:<br/>
      {error ? <span>{error}<br/></span> : false}
      {status}
    </span>
  );
}
