import { configure } from 'mobx';
import { IStores } from './stores';

import { StatusStore } from './StatusStore';

// This import ensures mobx batching
import 'mobx-react-lite/batchingForReactDom';

/**
 * Builds and initializes all of the stores
 */
export function getStores(): IStores {
  const stores: IStores = {
    statusStore: new StatusStore(),
  };

  return stores;
}

/**
 * Configures the mobx library. Should get called at App's initialization.
 */
export function configureMobx() {
  configure({
    enforceActions: 'observed',
  });
}
