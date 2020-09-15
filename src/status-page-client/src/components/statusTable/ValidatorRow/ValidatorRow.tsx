import React, { useMemo } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { Guardian } from '../../../../../model/model';
import { NodeServiceStatusCell } from './NodeServiceStatusCell';

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

  return (
    <TableRow>
      {/* Gist */}
      <TableCell>{validator.Name}</TableCell>

      {/* Services summary  */}
      <TableCell>Services summary</TableCell>

      {/* Expanded services */}
      {expandedServicesCells}
    </TableRow>
  );
});
