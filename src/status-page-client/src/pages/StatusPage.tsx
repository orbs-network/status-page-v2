import React, { useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { useStatusStore } from '../store/storeHooks';
import { toJS } from 'mobx';
import { Page } from '../components/structure/Page';
import { StatusTable, ValidatorStatusGist } from '../components/statusTable/StatusTable';
import { StatusRow } from "../components/networkStatus/StatusRow";
import { Button } from '@material-ui/core';

interface IProps {}

export const StatusPage = observer<React.FunctionComponent<IProps>>((props) => {
  const statusStore = useStatusStore();
  const [showAllRegistered, setShowAllRegistered] = useState(false);
  const onClick = showAllRegistered ? () => setShowAllRegistered(false) : () => setShowAllRegistered(true);

  console.log(toJS(statusStore.statusModel));

  const virtualChains = statusStore?.statusModel?.VirtualChains;
  const services = statusStore?.statusModel?.Services;

  const committeeNodes = statusStore?.statusModel?.CommitteeNodes;
  const standByNodes = statusStore?.statusModel?.StandByNodes;
  const allRegisteredNodes = statusStore?.statusModel?.AllRegisteredNodes;
  const validatorStatusGists = useMemo<ValidatorStatusGist[]>(() => {
    if (!committeeNodes || !standByNodes) {
      return [];
    }

    const committeeValidatorStatusGists: ValidatorStatusGist[] = Object.entries(committeeNodes).map(([guardianId, guardian]) => {
      const validatorStatusGist: ValidatorStatusGist = {
        ip: guardian.Ip,
        name: guardian.Name,
      };

      return validatorStatusGist;
    });

    return committeeValidatorStatusGists;
  }, [committeeNodes, standByNodes]);

  return (
    <Page>
      <StatusRow
        rootStatus={statusStore?.statusModel?.RootNodeStatus}
        ethereumStatus={statusStore?.statusModel?.EthereumStatus}
      />
      <StatusTable
        vcs={virtualChains || []}
        services={services || []}
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
