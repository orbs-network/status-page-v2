import React from 'react';
import App from "./App";
import {configureMobx, getStores} from "./store/storesInitialization";
import {Provider} from "mobx-react";
import { BrowserRouter as Router } from "react-router-dom";

interface IProps {

}

configureMobx();

const stores = getStores();

export const AppWrapper = React.memo<IProps>(props => {
   return (<>
      <Router>
         <Provider {...stores}>
            <App/>
         </Provider>
      </Router>
      </>)
});