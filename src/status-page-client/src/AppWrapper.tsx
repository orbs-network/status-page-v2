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

    useEffect(() => {
        // Define the interval function
        const fetchStatus = () => {
            if (stores?.statusStore?.fetchAndSetStatus) {
                stores.statusStore.fetchAndSetStatus();
            } else {
                console.warn('fetchAndSetStatus is not available');
            }
        };

        // Set up the interval
        const interval = setInterval(fetchStatus, 5000); // Run every 5 seconds

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, [stores]); // Recreate the interval if `stores` changes

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