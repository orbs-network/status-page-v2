import React, {  useState } from 'react';
import { observer } from 'mobx-react';
import { useStatusStore } from '../store/storeHooks';
import { toJS } from 'mobx';
import { Page } from '../components/structure/Page';
import { StatusTable } from '../components/statusTable/StatusTable';
import { StatusRow } from "../components/networkStatus/StatusRow";
import { Button } from '@material-ui/core';
import { EthereumStatus } from '../../../model/model';
import { getServices } from '../utils';

interface IProps {}

export const StatusPage = observer<React.FunctionComponent<IProps>>((props) => {
  const statusStore = useStatusStore();
  const [showAllRegistered, setShowAllRegistered] = useState(false);
  const onClick = showAllRegistered ? () => setShowAllRegistered(false) : () => setShowAllRegistered(true);

  const virtualChains = statusStore?.statusModel?.VirtualChains;
  const {services, vmServices, expandedServices} = getServices(statusStore?.statusModel?.Services);


  const committeeNodes = statusStore?.statusModel?.CommitteeNodes;
  const standByNodes = statusStore?.statusModel?.StandByNodes;
  const allRegisteredNodes = statusStore?.statusModel?.AllRegisteredNodes;
  
  return (
    <Page>
      <StatusRow
        rootStatus={statusStore?.statusModel?.Statuses["Root Node Health"]}
        ethereumStatus={statusStore?.statusModel?.Statuses["Ethereum Contracts Health"] as EthereumStatus }
        maticStatus={statusStore?.statusModel?.Statuses["Matic Contracts Health"] as EthereumStatus }
      />
      <br/>
      <StatusTable
        vcs={virtualChains || []}
        services={services || []}
        vmServices={vmServices || []}
        expandedServices={expandedServices || []}
        committeeValidators={
          !showAllRegistered ?
            (committeeNodes ? Object.values(committeeNodes) : []) : // regular view
            ([]) // in 'Show All Registered' the committee is always empty
        }
        standByValidators={
          !showAllRegistered ?
            (standByNodes ? Object.values(standByNodes) : []) : // regular view
            (allRegisteredNodes ? Object.values(allRegisteredNodes) : []) // in 'Show All Registered' everybody is standby
        }
        isShowAllRegistered={showAllRegistered}
      />
      <br/>
      <Button variant="outlined" onClick={onClick}>{showAllRegistered ? 'Show Current Validators' : 'Show All Registered'}</Button>
    </Page>
  );
});
