import React, { useMemo } from 'react';
import { NodeVirtualChain } from '../../../../../model/model';
import { StatusCell } from './StatusCell';

interface IProps {
  nodeVc: NodeVirtualChain;
}

export const NodeVcStatusCell = React.memo<IProps>((props) => {
  const { nodeVc } = props;

  const subTitle = useMemo(() => `${nodeVc.Version} (${nodeVc.ProtocolVersion})`, [nodeVc.ProtocolVersion, nodeVc.Version]);

  return (
    <StatusCell
      healthLevel={nodeVc.Status}
      title={nodeVc.BlockHeight.toLocaleString()}
      // titleLink={nodeVc.URLs.Status}
      subTitle={subTitle}
      subTitleLink={nodeVc.URLs.Version}
      tooltip={nodeVc.StatusToolTip}
      statusLink={nodeVc.URLs.Status}
      logsLink={nodeVc.URLs.Logs}
      metricsLink={nodeVc.URLs.Metrics}
    />
  );
});
