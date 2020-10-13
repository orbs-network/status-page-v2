import React, { useMemo } from 'react';
import { observer } from 'mobx-react';
import { useStatusStore } from '../store/storeHooks';
import { toJS } from 'mobx';
import { Page } from '../components/structure/Page';
import { StatusTable, ValidatorStatusGist } from '../components/statusTable/StatusTable';

interface IProps {}

export const StatusPage = observer<React.FunctionComponent<IProps>>((props) => {
  const statusStore = useStatusStore();

  console.log(toJS(statusStore.statusModel));

  const virtualChains = statusStore?.statusModel?.VirtualChains;
  const services = statusStore?.statusModel?.Services;

  const committeeNodes = statusStore?.statusModel?.CommitteeNodes;
  const standByNodes = statusStore?.statusModel?.StandByNodes;
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
      <StatusTable
        vcs={virtualChains || []}
        services={services || []}
        committeeValidators={committeeNodes ? Object.values(committeeNodes) : []}
        standByValidators={standByNodes ? Object.values(standByNodes) : []}
      />
    </Page>
  );
});
