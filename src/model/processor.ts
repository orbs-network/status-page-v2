import _ from 'lodash';
import { Configuration } from '../config';
import { Model } from './model';
import { getCurrentClockTime, fetchJson } from '../helpers';
import * as Logger from '../logger';

export class Processor {
  private model = new Model();

  constructor(private config: Configuration) {}

  // single tick of the run loop
  async run() {
    Logger.log('Processor: waking up do refresh model.');

    const data = await fetchJson(`${this.config.RootNodeEndpoint}/services/management-service/status`);
    this.model = {
      TimeSeconds: getCurrentClockTime(),
      VirtualChains: _.map(data.Payload.CurrentVirtualChains, (vc, vcId) => ({
        VirtualChainId: vcId,
        IsCanary: vc.RolloutGroup != 'main',
      })),
    };
  }

  getModel(): Model {
    return this.model;
  }
}
