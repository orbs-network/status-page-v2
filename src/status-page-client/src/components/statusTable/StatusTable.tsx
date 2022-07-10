import React, { useMemo, useState } from 'react';
import { Paper, Table, TableContainer } from '@material-ui/core';
import { VirtualChain, Guardian, Service } from '../../../../model/model';
import { StatusTableHeader } from './header/StatusTableHeader';
import { StatusTableBody } from './StatusTableBody';

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
  vmServices: Service[];
  isShowAllRegistered: boolean;
  expandedServices: Service[];
}

export const StatusTable = React.memo<IProps>((props) => {
  const { vcs, committeeValidators, standByValidators, services, isShowAllRegistered, vmServices, expandedServices } = props;
  // console.log({ vcs });
  // console.log({ committeeValidators: committeeValidators.map((c) => toJS(c)) });
  // console.log({ standByValidators: standByValidators.map((s) => toJS(s)) });

  const sortedCommitteeValidators = useMemo(() => {
    return [...committeeValidators].sort(sortValidatorByStake);
  }, [committeeValidators]);

  const sortedStandByValidators = useMemo(() => {
    return [...standByValidators].sort(sortValidatorByStake);
  }, [standByValidators]);

  const [showServices, setShowServices] = useState(false);

  // console.log({ showServices });

  return (
    <TableContainer component={Paper} style={{ width: 'fit-content', overflowX: 'inherit' }}>
      <Table size={'small'}>
        
        <StatusTableHeader expandedServices={expandedServices} vmServices={vmServices} services={services} vcs={vcs} setShowServices={setShowServices} showServices={showServices} />
        <StatusTableBody
        expandedServices={expandedServices}
        vmServices={vmServices}
          services={services}
          vcs={vcs}
          committeeValidators={sortedCommitteeValidators}
          standByValidators={sortedStandByValidators}
          showServices={showServices}
          isShowAllRegistered={isShowAllRegistered}
        />
      </Table>
    </TableContainer>
  );
});

const sortValidatorByStake = (a: Guardian, b: Guardian) => b.EffectiveStake - a.EffectiveStake;
