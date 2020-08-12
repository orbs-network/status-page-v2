import React from 'react';
import App from "./App";
import {configureMobx, getStores} from "./store/storesInitialization";
import {Provider} from "mobx-react";
import { BrowserRouter as Router } from "react-router-dom";

import { baseTheme } from "./theme/Theme";

import {
   makeStyles,
   StylesProvider,
   ThemeProvider,
} from "@material-ui/core/styles";

interface IProps {

}

configureMobx();

const stores = getStores();

export const AppWrapper = React.memo<IProps>(props => {
   return (<>
      <Router>
         <Provider {...stores}>
            <StylesProvider injectFirst>
               <ThemeProvider theme={baseTheme}>
               <App/>
               </ThemeProvider>
            </StylesProvider>
         </Provider>
      </Router>
      </>)
});