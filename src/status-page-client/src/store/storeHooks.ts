import React from 'react';
import { MobXProviderContext } from 'mobx-react';
import { IStores } from './stores';
import {StatusStore} from "./StatusStore";

export function useStores(): IStores {
  // @ts-ignore
  return React.useContext(MobXProviderContext);
}

export function useStatusStore(): StatusStore {
  return useStores().statusStore;
}
