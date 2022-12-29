import { action, observable } from 'mobx';
import { Model } from '../../../model/model';
import testmodal from '../status-mock.json';
// import StatusModelSampleJSON from '../local/StatusModelSample.json';

export class StatusStore {
  // @observable public statusModel: Model | undefined = StatusModelSampleJSON as Model;
  @observable public statusModel: Model | undefined;

  constructor() {
    this.fetchAndSetStatus();
  }

  private async fetchAndSetStatus() {
    // TODO : O.L : Organise it and add error handling
    const model = await this.fetchStatusObject();
    this.setStatusModel(model);
  }

  private async fetchStatusObject(): Promise<Model> {
    const res = await fetch('http://localhost:8081/json');
    const statusJson = (await res.json()) as Model;

    return statusJson;
  }

  @action('setStatusModel')
  private setStatusModel(model: Model) {
    this.statusModel = model;
  }
}
