import React, {useMemo} from 'react';
import {TableRow} from '@material-ui/core';
import {Guardian} from '../../../../../model/model';
import {NodeServiceStatusCell} from './NodeServiceStatusCell';
import {ServicesGistCell} from './ServicesGistCell';
import {NodeVcStatusCell} from './NodeVcStatusCell';
import {ValidatorInfoCell} from './ValidatorInfoCell';
import {isDebug, showVmServices} from '../../../consts';

interface IProps {
  validator: Guardian;
  isInCommitteeEth: boolean;
  isInCommitteeMatic: boolean;
  expandServices: boolean;
  servicesNames: string[];
  vmServicesNames: string[];
  vcsIds: string[];
  isShowAllRegistered: boolean;
  expandedServicesNames:  string[];
}
export const ValidatorRow = React.memo<IProps>((props) => {
  const { validator, expandServices, servicesNames, vcsIds, isInCommitteeEth, isInCommitteeMatic, isShowAllRegistered, vmServicesNames, expandedServicesNames } = props;

  const expandedServicesCells = useMemo(() => {
    return [...servicesNames, ...expandedServicesNames].map((serviceName) => {
      const nodeService = validator.NodeServices[serviceName];

      return <NodeServiceStatusCell key={serviceName} nodeService={nodeService} serviceName={serviceName} />;
    });
  }, [servicesNames,expandedServicesNames, validator.NodeServices]);

  const vmServicesCells = useMemo(() => {
    return vmServicesNames.filter(serviceName => serviceName !== 'vm-keepers').map((serviceName) => {
      const nodeService = validator.NodeServices[serviceName];

      return <NodeServiceStatusCell key={serviceName} nodeService={nodeService} serviceName={serviceName} />;
    });
  }, [vmServicesNames, validator.NodeServices]);

  const vmKeepersCells = useMemo(() => {
    return vmServicesNames.filter(serviceName => serviceName === 'vm-keepers').map((serviceName) => {
      const nodeService = validator.NodeServices[serviceName];

      return <NodeServiceStatusCell key={serviceName} nodeService={nodeService} serviceName={serviceName} />;
    });
  }, [vmServicesNames, validator.NodeServices]);

  const vcCells = useMemo(() => {
    return vcsIds.map((vcId) => {
      const nodeVc = validator.NodeVirtualChains[vcId];

      return <NodeVcStatusCell nodeVc={nodeVc} key={vcId} />;
    });
  }, [validator.NodeVirtualChains, vcsIds]);

  const servicesCells = useMemo(() => {
    return expandedServicesNames.map((service) => {
      const nodeService = validator.NodeServices[service];

      return <NodeServiceStatusCell nodeService={nodeService} key={service} serviceName={service} />;
    });
  }, [expandedServicesNames, validator.NodeServices]);

  const orderedServices = useMemo(() => {
    return servicesNames.map((serviceName) => validator.NodeServices[serviceName]);
  }, [servicesNames, validator.NodeServices]);

  return (
    <TableRow>
      {/* Gist */}
      <ValidatorInfoCell validator={validator} isInCommitteeEth={isInCommitteeEth} isInCommitteeMatic={isInCommitteeMatic} isShowAllRegistered={isShowAllRegistered} />

      {/* Services summary  */}
      <ServicesGistCell nodeServices={orderedServices} serviceNames={servicesNames} />

      {/* Expanded services */}
      {expandServices ? expandedServicesCells : servicesCells}

      {showVmServices() &&  isDebug() && vmKeepersCells}

      {showVmServices() &&  vmServicesCells}
      {/* Vcs status */}

      {isDebug() && vcCells}
    </TableRow>
  );
});
