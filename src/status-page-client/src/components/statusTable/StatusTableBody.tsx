import React, { useMemo } from 'react';
import { TableBody } from '@material-ui/core';
import { ValidatorRow } from './ValidatorRow/ValidatorRow';
import { VirtualChain, Guardian, Service } from '../../../../model/model';

interface IProps {
  vcs: VirtualChain[];
  committeeValidators: Guardian[];
  standByValidators: Guardian[];
  services: Service[];
  showServices: boolean;
}

export const StatusTableBody = React.memo<IProps>((props) => {
  const { vcs, services, committeeValidators, standByValidators, showServices } = props;

  const servicesNames = useMemo(() => {
    return services.map((service) => service.Name);
  }, [services]);

  const vcsIds = useMemo(() => {
    return vcs.map((vc) => vc.Id);
  }, [vcs]);

  const allValidators = useMemo(() => {
    return [...committeeValidators, ...standByValidators];
  }, [committeeValidators, standByValidators]);

  const validatorRows = useMemo(() => {
    return allValidators.map((validator) => (
      <ValidatorRow key={validator.OrbsAddress} validator={validator} expandServices={showServices} servicesNames={servicesNames} vcsIds={vcsIds} />
    ));
  }, [allValidators, servicesNames, showServices, vcsIds]);

  return <TableBody>{validatorRows}</TableBody>;
});
