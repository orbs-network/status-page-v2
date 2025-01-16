import React, {useEffect, useState} from 'react';
import App from './App';
import {configureMobx, getStores} from './store/storesInitialization';
import {Provider} from 'mobx-react';
import {BrowserRouter as Router} from 'react-router-dom';
import {baseTheme} from './theme/Theme';
import {StylesProvider, ThemeProvider} from '@material-ui/core/styles';

configureMobx();

export const AppWrapper = React.memo(() => {
    const stores = getStores();

    const refreshStores = () => {
        stores.statusStore.fetchAndSetStatus();
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            refreshStores();
        }, 30000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Router>
            <Provider {...stores}>
                <StylesProvider injectFirst>
                    <ThemeProvider theme={baseTheme}>
                        <App/>
                    </ThemeProvider>
                </StylesProvider>
            </Provider>
        </Router>
    );
});