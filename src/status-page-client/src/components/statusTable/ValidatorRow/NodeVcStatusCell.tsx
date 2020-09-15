import React from 'react';
import { NodeVirtualChain } from '../../../../../model/model';
import { StatusCell } from './StatusCell';

interface IProps {
  nodeVc: NodeVirtualChain;
}

export const NodeVcStatusCell = React.memo<IProps>((props) => {
  const { nodeVc } = props;

  return (
    <StatusCell
      healthLevel={nodeVc.Status}
      title={nodeVc.StatusMsg}
      titleLink={nodeVc.URLs.Status}
      subTitle={nodeVc.Version}
      subTitleLink={nodeVc.URLs.Version}
      tooltip={nodeVc.StatusToolTip}
      statusLink={nodeVc.URLs.Status}
      logsLink={nodeVc.URLs.Logs}
    />
  );
});
