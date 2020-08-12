import React from 'react';
import MaterialTable from "material-table";
import {TABLE_ICONS} from "../tables/TableIcons";

export interface StatusGist {

}

interface IProps {

}

export const StatusTable = React.memo<IProps>(props => {
   return <MaterialTable icons={TABLE_ICONS} columns={[]} data={[]}/>
});