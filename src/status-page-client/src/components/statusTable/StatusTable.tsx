import React, { useMemo, useState } from 'react';
import { Paper, Table, TableBody, TableContainer } from '@material-ui/core';
import { VirtualChain, Guardian, Service } from '../../../../model/model';
import { StatusTableHeader } from './StatusTableHeader';
import { toJS } from 'mobx';
import { ValidatorRow } from './ValidatorRow/ValidatorRow';

export interface ValidatorStatusGist {
  name: string;
  ip: string;
}

export interface VcGist {
  id: string;
  name: string;
}

interface IProps {
  vcs: VirtualChain[];
  committeeValidators: Guardian[];
  standByValidators: Guardian[];
  services: Service[];
}

export const StatusTable = React.memo<IProps>((props) => {
  const { vcs, committeeValidators, standByValidators, services } = props;
  console.log({ vcs });
  console.log({ committeeValidators: committeeValidators.map((c) => toJS(c)) });
  console.log({ standByValidators: standByValidators.map((s) => toJS(s)) });

  const [showServices, setShowServices] = useState(false);

  console.log({ showServices });

  const servicesNames = useMemo(() => {
    return services.map((service) => service.Name);
  }, [services]);

  const allValidators = useMemo(() => {
    return [...committeeValidators, ...standByValidators];
  }, [committeeValidators, standByValidators]);

  const validatorRows = useMemo(() => {
    return allValidators.map((validator) => (
      <ValidatorRow key={validator.OrbsAddress} validator={validator} expandServices={showServices} servicesNames={servicesNames} />
    ));
  }, [allValidators, servicesNames, showServices]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <StatusTableHeader services={services} vcs={vcs} setShowServices={setShowServices} showServices={showServices} />
        <TableBody>{validatorRows}</TableBody>
      </Table>
    </TableContainer>
  );
});
