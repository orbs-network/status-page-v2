import React, { useMemo } from 'react';
import { TableRow } from '@material-ui/core';
import { Guardian } from '../../../../../model/model';
import { NodeServiceStatusCell } from './NodeServiceStatusCell';
import { ServicesGistCell } from './ServicesGistCell';
import { NodeVcStatusCell } from './NodeVcStatusCell';
import { ValidatorInfoCell } from './ValidatorInfoCell';
import _, { indexOf } from 'lodash';
import { getNodeServices, getParamsFromUrl } from '../../../utils';
import { isDebug, EXPANDED_SERVICES } from '../../../consts';
interface IProps {
  validator: Guardian;
  isInCommittee: boolean;
  expandServices: boolean;
  servicesNames: string[];
  vcsIds: string[];
  isShowAllRegistered: boolean;
}
export const ValidatorRow = React.memo<IProps>((props) => {
  const { validator, expandServices, servicesNames, vcsIds, isInCommittee, isShowAllRegistered } = props;
  
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

  const servicesCells = useMemo(() => {
    return EXPANDED_SERVICES.map((service) => {
      const nodeService = validator.NodeServices[service];

      return <NodeServiceStatusCell nodeService={nodeService} key={service} />;
    });
  }, [validator.NodeVirtualChains]);

  const orderedServices = useMemo(() => {
    return getNodeServices(servicesNames, EXPANDED_SERVICES).map((serviceName) => validator.NodeServices[serviceName]);
  }, [servicesNames, validator.NodeServices]);


  return (
    <TableRow>
      {/* Gist */}
      <ValidatorInfoCell validator={validator} isInCommittee={isInCommittee} isShowAllRegistered={isShowAllRegistered} />

      {/* Services summary  */}
      <ServicesGistCell nodeServices={orderedServices} serviceNames={getNodeServices(servicesNames, EXPANDED_SERVICES)} />

      {/* Expanded services */}
      {expandServices ? expandedServicesCells : servicesCells}


      {/* Vcs status */}
      {isDebug() &&  vcCells}
    </TableRow>
  );
});
