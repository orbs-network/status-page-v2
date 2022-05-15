import { Service } from '../../../model/model';

export const getParamsFromUrl = (name: string) => {
  const query = new URLSearchParams(window.location.search);
  return query.get(name);
};

export const getNodeServices = (servicesNames: string[], servicesToExclude: string[]) => {
  return servicesNames.filter((m) => !servicesToExclude.includes(m));
};
