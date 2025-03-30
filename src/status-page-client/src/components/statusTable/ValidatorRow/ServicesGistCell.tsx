import React, {useEffect, useMemo, useState} from 'react';
import {TableCell, Tooltip} from '@material-ui/core';
import {NodeService} from '../../../../../model/model';
import {HealthLevel} from '../../../shared/HealthLevel';
import {backgroundColorFromHealthLevel} from '../../statusUtils';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import {makeStyles} from '@material-ui/core/styles';
import {HourglassFullRounded} from "@material-ui/icons";
import {differenceInSeconds} from 'date-fns';

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
    const {nodeServices, serviceNames} = props;

    const [timeLeft, setTimeleft] = useState("");
    const [nodeServiceWithTimestamp, setNodeServiceWithTimestamp] = useState<NodeService | null>(null);

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

    const renderTimeLeft = ((updateTimestamp: string) => {
        const epoch = parseInt(updateTimestamp);
        if (isNaN(epoch) || epoch==0) {
            return "Updating now";
        }
        const futureDate = new Date(epoch * 1000); // Convert from epoch seconds to milliseconds
        const currentDate = new Date();

        // Calculate the difference in seconds
        const diffInSeconds = differenceInSeconds(futureDate, currentDate);

        // If the time has already passed, don't display anything
        if (diffInSeconds <= 0) return "Updating now";

        // Format the time in HH:mm:ss
        const hours = Math.floor(diffInSeconds / 3600);
        const minutes = Math.floor((diffInSeconds % 3600) / 60);
        const seconds = diffInSeconds % 60;

        // Ensure two-digit formatting for hours, minutes, and seconds
        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        return "Updating in: "+formattedTime;
    });

    useEffect(() => {
        const matchedNodeService = nodeServices.find(
            (nodeService, index) =>
                serviceNames[index] === "Controller" && nodeService.Status === HealthLevel.Blue
        );
        setNodeServiceWithTimestamp(matchedNodeService || null);
    }, [nodeServices, serviceNames]);

    const servicesIcons = useMemo(() => {
        return nodeServices.map((nodeService, index) => {
            const serviceStatusOK = nodeService.Status === HealthLevel.Green;
            const serviceStatusUnknown = nodeService.Status === HealthLevel.Gray;
            let serviceName;
            try {
                serviceName = serviceNames[index]; // TODO : O.L : Merge data objects
            } catch (e) {
                serviceName = "Unknown";
            }
            let tooltipText = nodeService.StatusToolTip;

            // Clear tooltipText only for the matching nodeService
            if (nodeServiceWithTimestamp === nodeService) {
                tooltipText = "";
            }

            let icon = <CheckIcon/>;

            if (nodeService.Status === HealthLevel.Blue) {
                icon = <HourglassFullRounded/>;
            } else if (nodeService.Status === HealthLevel.Red) {
                icon = <CloseIcon/>;
            } else if (nodeService.Status === HealthLevel.Gray) {
                icon = <SearchIcon/>;
            } else if (nodeService.Status === HealthLevel.Yellow) {
                icon = <CloseIcon/>;
            }
            // const icon = serviceStatusUnknown ? <SearchIcon /> : (serviceStatusOK ? <HourglassFullTwoTone /> : <CloseIcon />);
            // const title = serviceStatusOK ? serviceName : `${serviceName} : ${nodeService.StatusMsg || nodeService.Status}`;

            return (
                <Tooltip title={createTooltip(serviceName, nodeService.StatusMsg, tooltipText)} key={serviceName} arrow>
                    <a className={classes.link} href={nodeService.URLs.Status} target={'_blank'}
                       rel={'noopener noreferrer'}>
                        {icon}
                    </a>
                </Tooltip>
            );
        });
    }, [classes.link, nodeServices, serviceNames, nodeServiceWithTimestamp]);

    useEffect(() => {
        if (nodeServiceWithTimestamp == null) {
            setTimeleft("");
            return;
        }

        const interval = setInterval(() => {
            setTimeleft(renderTimeLeft(nodeServiceWithTimestamp.StatusToolTip));
        }, 1000);
        return () => clearInterval(interval);
    }, [backgroundColor, nodeServiceWithTimestamp]);

    // DEV_NOTE : O.L : This 'borderRight:none' is a hack to prevent overflowX on large screens
    // TODO : O.L : Find a better solution
    return <TableCell className={classes.cell} style={{backgroundColor}}>
        <div style={{ fontSize: '15px' }}>{timeLeft}</div>
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
