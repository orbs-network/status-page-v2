import React from 'react';
import {observer} from "mobx-react";
import {useStatusStore} from "../store/storeHooks";
import {toJS} from "mobx";
import {Page} from "../components/structure/Page";
import {StatusTable} from "../components/statusTable/StatusTable";

interface IProps {

}

export const StatusPage = observer<React.FunctionComponent<IProps>>(props => {
   const statusStore = useStatusStore();

   console.log(toJS(statusStore.statusModel));

   return <Page>
      <StatusTable/>
   </Page>
});