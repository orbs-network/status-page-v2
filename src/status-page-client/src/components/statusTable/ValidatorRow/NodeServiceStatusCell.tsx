import React from 'react';
import { NodeService } from '../../../../../model/model';
import { StatusCell } from './StatusCell';

interface IProps {
  nodeService: NodeService;
}

export const NodeServiceStatusCell = React.memo<IProps>((props) => {
  const { nodeService } = props;

  return <StatusCell healthLevel={nodeService.Status} title={truncate(nodeService.StatusMsg)} subTitle={nodeService.Version} />;
});

const TITLE_LENGTH = 10;

const truncate = (input: string) => (input.length > TITLE_LENGTH ? `${input.substring(0, TITLE_LENGTH)}...` : input);
