import _ from 'lodash';
import { Service } from '../../../model/model';
import { EXPANDED_SERVICES } from '../consts';

export const getParamsFromUrl = (name: string) => {
  const query = new URLSearchParams(window.location.search);
  return query.get(name);
};


export const getServices = (allServices?: Service[]) => {
  if (!allServices) {
    return { vmServices: null, services: null };
  }
  const vmServices: Service[] = [];
  const services: Service[] = [];
  const expandedServices: Service[] = [];

  allServices.forEach((service) => {
    if (_.startsWith(service.Name, 'vm-')) {
      vmServices.push(service);
    } else if (EXPANDED_SERVICES.includes(service.Name)) {
      expandedServices.push(service);
    } else {
      services.push(service);
    }
  });

  return { vmServices, services, expandedServices };
};
