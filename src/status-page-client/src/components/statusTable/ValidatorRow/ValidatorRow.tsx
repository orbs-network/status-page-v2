import React, { useMemo } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { Guardian } from '../../../../../model/model';
import { NodeServiceStatusCell } from './NodeServiceStatusCell';
import { ServicesGistCell } from './ServicesGistCell';
import { NodeVcStatusCell } from './NodeVcStatusCell';

interface IProps {
  validator: Guardian;
  expandServices: boolean;
  servicesNames: string[];
  vcsIds: string[];
}

export const ValidatorRow = React.memo<IProps>((props) => {
  const { validator, expandServices, servicesNames, vcsIds } = props;

  const expandedServicesCells = useMemo(() => {
    return servicesNames.map((serviceName) => {
      const nodeService = validator.NodeServices[serviceName];

      return <NodeServiceStatusCell key={serviceName} nodeService={nodeService} />;
    });
  }, [servicesNames, validator.NodeServices]);

  const vcCells = useMemo(() => {
    return vcsIds.map((vcId) => {
      const nodeVc = validator.NodeVirtualChains[vcId];

      return <NodeVcStatusCell nodeVc={nodeVc} key={vcId} />;
    });
  }, [validator.NodeVirtualChains, vcsIds]);

  const orderedServices = useMemo(() => {
    return servicesNames.map((serviceName) => validator.NodeServices[serviceName]);
  }, [servicesNames, validator.NodeServices]);

  return (
    <TableRow>
      {/* Gist */}
      <TableCell>{validator.Name}</TableCell>

      {/* Services summary  */}
      <ServicesGistCell nodeServices={orderedServices} serviceNames={servicesNames} />

      {/* Expanded services */}
      {expandServices ? expandedServicesCells : null}

      {/* Vcs status */}
      {vcCells}
    </TableRow>
  );
});
