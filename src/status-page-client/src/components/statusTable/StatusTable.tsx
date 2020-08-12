import React, {useMemo} from 'react';
import MaterialTable, {Column} from "material-table";
import {TABLE_ICONS} from "../tables/TableIcons";
import {Paper, Table, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import { VirtualChain, Guardian,  } from '../../../../model/model';

export interface ValidatorStatusGist {
   name: string;
   ip: string;
}

export interface VcGist {
   id: string;
   name: string;
}

interface IProps {
   vcs: VirtualChain[],
   committeeValidators: Guardian[],
   standByValidators: Guardian[],
}

export const StatusTable = React.memo<IProps>(props => {
   const { vcs, committeeValidators, standByValidators } = props;
   console.log(vcs);
   console.log(committeeValidators);

   const vcsRow = useMemo(() => {
      return <TableRow>
         <TableCell ></TableCell>
         <TableCell >Validators</TableCell>
         <TableCell>Node services</TableCell>
      </TableRow>
   }, []);

   // return <MaterialTable icons={TABLE_ICONS} columns={columns} data={validatorStatusGists}/>
   return <TableContainer component={Paper}>
      <Table>
         <TableHead>
            <TableRow>
               <TableCell>Validators</TableCell>
               <TableCell>Node services</TableCell>
               {vcs.map(vc => <TableCell key={vc.Id}>{vc.Id} - {vc.Name}</TableCell>)}
            </TableRow>
            {vcsRow}
         </TableHead>
      </Table>
   </TableContainer>
});