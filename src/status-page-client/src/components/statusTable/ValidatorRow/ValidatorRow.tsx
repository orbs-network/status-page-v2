import React, { useMemo } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { Guardian } from '../../../../../model/model';
import { NodeServiceStatusCell } from './NodeServiceStatusCell';
import { ServicesGistCell } from './ServicesGistCell';

interface IProps {
  validator: Guardian;
  expandServices: boolean;
  servicesNames: string[];
}

export const ValidatorRow = React.memo<IProps>((props) => {
  const { validator, expandServices, servicesNames } = props;

  const expandedServicesCells = useMemo(() => {
    if (!expandServices) {
      return null;
    } else {
      return servicesNames.map((serviceName) => {
        const nodeService = validator.NodeServices[serviceName];

        return <NodeServiceStatusCell key={serviceName} nodeService={nodeService} />;
      });
    }
  }, [expandServices, servicesNames, validator.NodeServices]);

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
      {expandedServicesCells}
    </TableRow>
  );
});
