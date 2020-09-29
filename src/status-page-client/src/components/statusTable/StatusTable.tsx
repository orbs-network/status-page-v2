import React, { useMemo, useState } from 'react';
import { Paper, Table, TableBody, TableContainer } from '@material-ui/core';
import { VirtualChain, Guardian, Service } from '../../../../model/model';
import { StatusTableHeader } from './header/StatusTableHeader';
import { toJS } from 'mobx';
import { ValidatorRow } from './ValidatorRow/ValidatorRow';
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
}

export const StatusTable = React.memo<IProps>((props) => {
  const { vcs, committeeValidators, standByValidators, services } = props;
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
        <StatusTableHeader services={services} vcs={vcs} setShowServices={setShowServices} showServices={showServices} />
        <StatusTableBody
          services={services}
          vcs={vcs}
          committeeValidators={sortedCommitteeValidators}
          standByValidators={sortedStandByValidators}
          showServices={showServices}
        />
      </Table>
    </TableContainer>
  );
});

const sortValidatorByStake = (a: Guardian, b: Guardian) => b.EffectiveStake - a.EffectiveStake;
