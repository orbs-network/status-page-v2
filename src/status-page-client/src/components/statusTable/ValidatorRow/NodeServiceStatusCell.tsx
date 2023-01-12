import React from 'react';
import {NodeService} from '../../../../../model/model';
import {StatusCell} from './StatusCell';

interface IProps {
    nodeService: NodeService;
    serviceName: string;
}

export const NodeServiceStatusCell = React.memo<IProps>((props) => {
    const {nodeService, serviceName} = props;

    return (
        <StatusCell
            serviceName={serviceName}
            healthLevel={nodeService.Status}
            title={nodeService.StatusMsg}
            titleLink={nodeService.URLs.Status}
            subTitle={nodeService.Version}
            subTitleLink={nodeService.URLs.Version}
            tooltip={nodeService.StatusToolTip}
            statusLink={nodeService.URLs.Status}
            logsLink={nodeService.URLs.Logs}
            metricsLink={nodeService.URLs.Metrics}
            statusSpec={nodeService.StatusSpec}
        />
    );
});
