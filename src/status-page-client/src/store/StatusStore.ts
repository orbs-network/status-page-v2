import {action, observable} from "mobx";
import  {Model} from '../../../model/model';

export class StatusStore {
    @observable public statusModel: Model | undefined;

    @action('setStatusModel')
    private setStatusModel(model: Model) {
        this.statusModel = model;
    }
}