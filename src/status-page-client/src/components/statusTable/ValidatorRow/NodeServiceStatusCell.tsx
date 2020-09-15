import React from 'react';
import { NodeService } from '../../../../../model/model';
import { StatusCell } from './StatusCell';

interface IProps {
  nodeService: NodeService;
}

export const NodeServiceStatusCell = React.memo<IProps>((props) => {
  const { nodeService } = props;

  return <StatusCell healthLevel={nodeService.Status} title={nodeService.StatusMsg} subTitle={nodeService.Version} />;
});
