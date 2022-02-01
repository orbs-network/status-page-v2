import React, { useMemo } from 'react';
import { TableBody } from '@material-ui/core';
import { ValidatorRow } from './ValidatorRow/ValidatorRow';
import { VirtualChain, Guardian, Service } from '../../../../model/model';
import _ from 'lodash';

interface IProps {
  vcs: VirtualChain[];
  committeeValidators: Guardian[];
  standByValidators: Guardian[];
  services: Service[];
  showServices: boolean;
  isShowAllRegistered: boolean;
}

export const StatusTableBody = React.memo<IProps>((props) => {
  const { vcs, services, committeeValidators, standByValidators, showServices, isShowAllRegistered } = props;

  const servicesNames = useMemo(() => {
    return services.map((service) => service.Name);
  }, [services]);

  const vcsIds = useMemo(() => {
    return vcs.map((vc) => vc.Id);
  }, [vcs]);

  const allValidators = useMemo(() => {
    return _.unionBy(committeeValidators, standByValidators, 'OrbsAddress');
  }, [committeeValidators, standByValidators]);

  const validatorRows = useMemo(() => {
    return allValidators.map((validator) => {
      const isInCommittee = committeeValidators.includes(validator);

      return (
        <ValidatorRow
          key={validator.OrbsAddress}
          validator={validator}
          isInCommittee={isInCommittee}
          expandServices={showServices}
          servicesNames={servicesNames}
          vcsIds={vcsIds}
          isShowAllRegistered={isShowAllRegistered}
        />
      );
    });
  }, [allValidators, committeeValidators, servicesNames, showServices, vcsIds]);

  return <TableBody>{validatorRows}</TableBody>;
});
