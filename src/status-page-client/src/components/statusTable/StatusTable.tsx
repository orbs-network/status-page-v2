import React, { useMemo, useState } from 'react';
import { Paper, Table, TableBody, TableContainer } from '@material-ui/core';
import { VirtualChain, Guardian, Service } from '../../../../model/model';
import { StatusTableHeader } from './StatusTableHeader';
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

  const [showServices, setShowServices] = useState(false);

  // console.log({ showServices });

  return (
    <TableContainer component={Paper} style={{ width: '90rem', maxWidth: '100%' }}>
      <Table size={'small'}>
        <StatusTableHeader services={services} vcs={vcs} setShowServices={setShowServices} showServices={showServices} />
        <StatusTableBody
          services={services}
          vcs={vcs}
          committeeValidators={committeeValidators}
          standByValidators={standByValidators}
          showServices={showServices}
        />
      </Table>
    </TableContainer>
  );
});
