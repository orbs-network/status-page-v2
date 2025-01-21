import React from 'react';
import { NodeService } from '../../../../../model/model';
import { StatusCell } from './StatusCell';

interface IProps {
  nodeService: NodeService;
    serviceName: string;
}

export const NodeServiceStatusCell = React.memo<IProps>((props) => {
    const { nodeService, serviceName } = props;

    // Add default values or fallbacks for nested properties
    const status = nodeService?.Status ?? "Unknown";
    const statusMsg = nodeService?.StatusMsg ?? "No message available";
    const urls = nodeService?.URLs || {};
    const version = nodeService?.Version ?? "Unknown";

    return (
        <StatusCell
            serviceName={serviceName}
            healthLevel={status}
            title={statusMsg}
            titleLink={urls.Status}
            subTitle={version}
            subTitleLink={urls.Version}
            tooltip={nodeService?.StatusToolTip ?? ""}
            statusLink={urls.Status}
            logsLink={urls.Logs}
            metricsLink={urls.Metrics}
            statusSpec={nodeService?.StatusSpec}
        />
    );
});
