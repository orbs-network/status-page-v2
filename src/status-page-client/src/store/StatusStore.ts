import {action, observable} from "mobx";
import  {Model} from '../../../model/model';
import StatusModelSampleJSON from '../local/StatusModelSample.json'


export class StatusStore {
    @observable public statusModel: Model | undefined = (StatusModelSampleJSON as Model);

    @action('setStatusModel')
    private setStatusModel(model: Model) {
        this.statusModel = model;
    }
}